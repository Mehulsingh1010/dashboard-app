import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { WelcomeEmail } from "@/components/emails/welcome-email"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 })
    }

    //database
    const { db } = await connectToDatabase()

    //finding otp in db
    const otpRecord = await db.collection("otps").findOne({ email })

    if (!otpRecord) {
      return NextResponse.json({ message: "OTP not found" }, { status: 400 })
    }

    //if more than 10 minutes then otp is expired
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 })
    }

    //verify otp
    if (otpRecord.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 })
    }

    //createor update user in db
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          email,
          verified: true,
          lastLogin: new Date(),
        },
      },
      { upsert: true },
    )

    //del otp from db
    await db.collection("otps").deleteOne({ email })

    //like jwt token generation
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    //2nd mail for welcome
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "singhmehul072@gmail.com",
          pass: "ghfp pqen mejx qlan",
        },
      })

      //render welcome email
      const emailHtml = await render(WelcomeEmail({ email }))

      await transporter.sendMail({
        from: '"Dashboard App" <singhmehul072@gmail.com>',
        to: email,
        subject: "Welcome to Dashboard App!",
        html: emailHtml,
      })
    } catch (emailError) {
      console.error("Welcome email error:", emailError)
      //fallback to just returning the token(was causing issues with email sending)
    }

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        token,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ message: "Failed to verify OTP" }, { status: 500 })
  }
}
