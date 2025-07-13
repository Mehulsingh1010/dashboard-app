import { Html, Head, Body, Container, Section, Text, Heading, Hr, Img } from "@react-email/components"

interface OTPEmailProps {
  otp: string
  email: string
}

const main = {
  backgroundColor: "#f8fafc", // slate-50
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: "0",
  padding: "20px 0",
  lineHeight: "1.5",
}

const container = {
  backgroundColor: "#ffffff", // white
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl
}

const headerSection = {
  background: "#2860e8", // blue-600 to indigo-700
  padding: "40px 20px",
  textAlign: "center" as const,
}

const logoContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
}

const logoImg = {
  width: "32px",
  height: "32px",
  borderRadius: "9999px", // rounded-full
  backgroundColor: "#ffffff", // white
  padding: "4px",
  marginRight: "8px",
}

const appName = {
  color: "#ffffff", // white
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
}

const tagline = {
  color: "#e2e8f0", // slate-200
  fontSize: "16px",
  margin: "0",
  fontWeight: "500",
}

const content = {
  padding: "40px 40px",
}

const welcomeSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
}

const heading = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#1e293b", // slate-900
  margin: "0 0 16px 0",
  textAlign: "center" as const,
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#475569", // slate-600
  margin: "0",
  textAlign: "center" as const,
}

const otpSection = {
  margin: "40px 0",
}

const otpLabel = {
  fontSize: "16px",
  color: "#374151", // gray-700
  textAlign: "center" as const,
  margin: "0 0 20px 0",
  fontWeight: "600",
}

const otpContainer = {
  background: "#2860e8", // blue-600 to indigo-700
  borderRadius: "16px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "0 auto 24px auto",
  maxWidth: "300px",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // shadow-md
}

const otpText = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#ffffff", // white
  letterSpacing: "12px",
  margin: "0",
  fontFamily: "Monaco, 'Cascadia Code', 'Roboto Mono', monospace",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
}

const otpInfo = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap" as const,
  gap: "16px",
}

const infoText = {
  fontSize: "14px",
  color: "#6b7280", // gray-500
  margin: "0",
  textAlign: "center" as const,
}

const securityNotice = {
  backgroundColor: "#fef3c7", // yellow-100
  border: "1px solid #f59e0b", // orange-500
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
}

const securityTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#92400e", // orange-800
  margin: "0 0 12px 0",
}

const securityText = {
  fontSize: "14px",
  color: "#92400e", // orange-800
  lineHeight: "22px",
  margin: "0",
}

const hr = {
  borderColor: "#e5e7eb", // gray-200
  margin: "40px 0",
}

const footer = {
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "14px",
  color: "#374151", // gray-700
  margin: "0 0 12px 0",
}

const footerSmall = {
  fontSize: "12px",
  color: "#9ca3af", // gray-400
  margin: "8px 0",
}

export function OTPEmail({ otp, email }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={headerSection}>
            <div style={logoContainer}>
              <Img src="/placeholder.svg?height=32&width=32" alt="StockFlow Logo" style={logoImg} />
              <Text style={appName}>StockFlow</Text>
            </div>
            <Text style={tagline}>Your Inventory Management Solution</Text>
          </Section>

          <Section style={content}>
            {/* Welcome section */}
            <div style={welcomeSection}>
              <Heading style={heading}>Secure Access Code</Heading>
              <Text style={paragraph}>
                Hello! We've received a sign-in request for your StockFlow account. Your security is our priority, so
                we've generated a unique verification code for you.
              </Text>
            </div>

            {/* OTP Display */}
            <div style={otpSection}>
              <Text style={otpLabel}>Your 6-digit verification code:</Text>
              <div style={otpContainer}>
                <Text style={otpText}>{otp}</Text>
              </div>
              <div style={otpInfo}>
                <Text style={infoText}>
                  ⏱️ <strong>Expires in 10 minutes</strong>
                </Text>
                <Text style={infoText}>
                  🔒 <strong>Keep this code secure</strong>
                </Text>
              </div>
            </div>

            {/* Security Notice */}
            <div style={securityNotice}>
              <Text style={securityTitle}>🛡️ Security Notice</Text>
              <Text style={securityText}>
                If you didn't request this code, please ignore this email. Your account remains secure. Never share this
                code with anyone - our team will never ask for it.
              </Text>
            </div>

            <Hr style={hr} />

            {/* Footer */}
            <div style={footer}>
              <Text style={footerText}>
                This email was sent to <strong>{email}</strong>
              </Text>
              <Text style={footerSmall}>Need help? Contact our support team at support@stockflow.com</Text>
              <Text style={footerSmall}>© 2025 StockFlow. All rights reserved.</Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
