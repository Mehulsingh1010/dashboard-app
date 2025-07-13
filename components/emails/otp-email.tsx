import { Html, Head, Body, Container, Section, Text, Heading, Hr } from "@react-email/components"

interface OTPEmailProps {
  otp: string
  email: string
}

export function OTPEmail({ otp, email }: OTPEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .pulse { animation: pulse 2s infinite; }
          .slide-in { animation: slideIn 0.8s ease-out; }
        `}</style>
      </Head>
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={headerSection}>
            <div style={logoContainer}>
              <Text style={logo}>
                🏠 Dashboard App
              </Text>
              <Text style={tagline}>Your Inventory Management Solution</Text>
            </div>
          </Section>

          <Section style={content}>
            {/* Welcome section with icon */}
            <div style={welcomeSection}>
              <div style={iconContainer}>
                <Text style={securityIcon}>🔐</Text>
              </div>
              <Heading style={heading}>
                Secure Access Code
              </Heading>
              <Text style={paragraph}>
                Hello! We've received a sign-in request for your Dashboard App account. 
                Your security is our priority, so we've generated a unique verification code for you.
              </Text>
            </div>

            {/* OTP Display with enhanced styling */}
            <div style={otpSection}>
              <Text style={otpLabel}>Your 6-digit verification code:</Text>
              <div style={otpContainer}>
                <Text style={otpText} className="pulse">
                  {otp}
                </Text>
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
                If you didn't request this code, please ignore this email. Your account remains secure.
                Never share this code with anyone - our team will never ask for it.
              </Text>
            </div>

            <Hr style={hr} />

            {/* Footer */}
            <div style={footer}>
              <Text style={footerText}>
                This email was sent to <strong>{email}</strong>
              </Text>
              <Text style={footerSmall}>
                Need help? Contact our support team at support@dashboardapp.com
              </Text>
              <Text style={footerSmall}>
                © 2025 Dashboard App. All rights reserved.
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f8fafc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: "0",
  padding: "0",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
}

const headerSection = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "0",
}

const logoContainer = {
  padding: "40px 20px",
  textAlign: "center" as const,
}

const logo = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
}

const tagline = {
  color: "#e2e8f0",
  fontSize: "14px",
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

const iconContainer = {
  marginBottom: "20px",
}

const securityIcon = {
  fontSize: "48px",
  margin: "0",
}

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#475569",
  margin: "0",
  textAlign: "center" as const,
}

const otpSection = {
  margin: "40px 0",
}

const otpLabel = {
  fontSize: "16px",
  color: "#374151",
  textAlign: "center" as const,
  margin: "0 0 20px 0",
  fontWeight: "600",
}

const otpContainer = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "16px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "0 0 24px 0",
  position: "relative" as const,
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
}

const otpText = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#ffffff",
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
  color: "#6b7280",
  margin: "0",
  textAlign: "center" as const,
}

const securityNotice = {
  backgroundColor: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
}

const securityTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#92400e",
  margin: "0 0 12px 0",
}

const securityText = {
  fontSize: "14px",
  color: "#92400e",
  lineHeight: "22px",
  margin: "0",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "40px 0",
}

const footer = {
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "14px",
  color: "#374151",
  margin: "0 0 12px 0",
}

const footerSmall = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "8px 0",
}