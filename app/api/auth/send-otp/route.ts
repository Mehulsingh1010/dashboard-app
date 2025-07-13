import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { OTPEmail } from "@/components/emails/otp-email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Connect to database
    const { db } = await connectToDatabase()

    // Store OTP in database
    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    )

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "singhmehul072@gmail.com",
        pass: "ghfp pqen mejx qlan",
      },
    })

    // Render email HTML - await the render function
    const emailHtml = await render(OTPEmail({ otp, email }))

    // Send email
    await transporter.sendMail({
      from: '"Dashboard App" <singhmehul072@gmail.com>',
      to: email,
      subject: "Your Verification Code",
      html: emailHtml,
    })

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 })
  }
}
