import { Html, Head, Body, Container, Section, Text, Heading, Button, Hr } from "@react-email/components"

interface WelcomeEmailProps {
  email: string
}

export function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @keyframes fadeInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
          }
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          .fade-in-up { animation: fadeInUp 0.8s ease-out; }
          .bounce { animation: bounce 2s infinite; }
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
            background-size: 200px;
            animation: shimmer 2s infinite;
          }
        `}</style>
      </Head>
      <Body style={main}>
        <Container style={container}>
          {/* Animated Header */}
          <Section style={headerSection}>
            <div style={logoContainer}>
              <Text style={celebrationEmoji} className="bounce">🎉</Text>
              <Text style={logo}>
                🏠 Dashboard App
              </Text>
              <Text style={tagline}>Your Journey Starts Here!</Text>
            </div>
          </Section>

          <Section style={content}>
            {/* Welcome Message */}
            <div style={welcomeContainer}>
              <Heading style={heading}>
                Welcome to Dashboard App!
              </Heading>
              <Text style={subheading}>
                🚀 Your email has been successfully verified and your account is now active!
              </Text>
            </div>

            {/* Success Badge */}
            <div style={successBadge}>
              <Text style={successIcon}>✅</Text>
              <Text style={successText}>Account Successfully Activated</Text>
            </div>

            {/* Feature Showcase */}
            <div style={featuresSection}>
              <Text style={featuresTitle}>🌟 What's waiting for you:</Text>
              
              <div style={featureGrid}>
                <div style={featureCard}>
                  <Text style={featureIcon}>📊</Text>
                  <Text style={featureTitle}>Smart Analytics</Text>
                  <Text style={featureDescription}>
                    Get comprehensive insights into your product performance with real-time dashboards
                  </Text>
                </div>

                <div style={featureCard}>
                  <Text style={featureIcon}>📋</Text>
                  <Text style={featureTitle}>Product Management</Text>
                  <Text style={featureDescription}>
                    Effortlessly manage your entire product catalog with advanced tools
                  </Text>
                </div>

                <div style={featureCard}>
                  <Text style={featureIcon}>📈</Text>
                  <Text style={featureTitle}>Live Tracking</Text>
                  <Text style={featureDescription}>
                    Monitor your inventory levels and get alerts before you run out
                  </Text>
                </div>

                <div style={featureCard}>
                  <Text style={featureIcon}>🔍</Text>
                  <Text style={featureTitle}>Smart Search</Text>
                  <Text style={featureDescription}>
                    Find anything instantly with our powerful search and filtering system
                  </Text>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div style={ctaSection}>
              <Text style={ctaTitle}>Ready to take control of your inventory?</Text>
              <div style={buttonContainer}>
                <Button href="#" style={primaryButton}>
                  🚀 Launch Dashboard
                </Button>
              </div>
              <Text style={ctaSubtext}>
                Set up your first product in less than 2 minutes!
              </Text>
            </div>

            {/* Quick Start Guide */}
            <div style={quickStartSection}>
              <Text style={quickStartTitle}>⚡ Quick Start Guide</Text>
              <div style={stepsList}>
                <div style={step}>
                  <Text style={stepNumber}>1</Text>
                  <Text style={stepText}>Add your first product category</Text>
                </div>
                <div style={step}>
                  <Text style={stepNumber}>2</Text>
                  <Text style={stepText}>Upload your product inventory</Text>
                </div>
                <div style={step}>
                  <Text style={stepNumber}>3</Text>
                  <Text style={stepText}>Set up low stock alerts</Text>
                </div>
                <div style={step}>
                  <Text style={stepNumber}>4</Text>
                  <Text style={stepText}>Explore analytics dashboard</Text>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div style={supportSection}>
              <Text style={supportTitle}>💬 Need Help Getting Started?</Text>
              <Text style={supportText}>
                Our support team is here to help you succeed. Whether you have questions about features 
                or need assistance with setup, we're just a message away.
              </Text>
              <div style={supportButtons}>
                <Button href="#" style={secondaryButton}>
                  📚 View Documentation
                </Button>
                <Button href="#" style={secondaryButton}>
                  💬 Contact Support
                </Button>
              </div>
            </div>

            <Hr style={hr} />

            {/* Footer */}
            <div style={footer}>
              <Text style={footerWelcome}>
                Welcome aboard! 🎊
              </Text>
              <Text style={footerSignature}>
                The Dashboard App Team
              </Text>
              <Text style={footerEmail}>
                This email was sent to <strong>{email}</strong>
              </Text>
              <Text style={footerSmall}>
                © 2025 Dashboard App. Empowering businesses with smart inventory management.
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
  padding: "20px 0",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
}

const headerSection = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  position: "relative" as const,
}

const logoContainer = {
  padding: "48px 20px",
  textAlign: "center" as const,
  position: "relative" as const,
}

const celebrationEmoji = {
  fontSize: "64px",
  margin: "0 0 16px 0",
  display: "block",
}

const logo = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
}

const tagline = {
  color: "#e2e8f0",
  fontSize: "16px",
  margin: "0",
  fontWeight: "500",
}

const content = {
  padding: "48px 40px",
}

const welcomeContainer = {
  textAlign: "center" as const,
  marginBottom: "40px",
}

const heading = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
}

const subheading = {
  fontSize: "18px",
  color: "#475569",
  margin: "0",
  fontWeight: "500",
}

const successBadge = {
  backgroundColor: "#dcfce7",
  border: "2px solid #16a34a",
  borderRadius: "50px",
  padding: "16px 32px",
  textAlign: "center" as const,
  margin: "32px auto",
  maxWidth: "300px",
}

const successIcon = {
  fontSize: "24px",
  margin: "0 8px 0 0",
}

const successText = {
  fontSize: "16px",
  color: "#15803d",
  fontWeight: "bold",
  margin: "0",
}

const featuresSection = {
  margin: "48px 0",
}

const featuresTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1e293b",
  textAlign: "center" as const,
  margin: "0 0 32px 0",
}

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "24px",
}

const featureCard = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
}

const featureIcon = {
  fontSize: "32px",
  margin: "0 0 12px 0",
}

const featureTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "0 0 8px 0",
}

const featureDescription = {
  fontSize: "14px",
  color: "#64748b",
  lineHeight: "20px",
  margin: "0",
}

const ctaSection = {
  backgroundColor: "#f0f9ff",
  borderRadius: "16px",
  padding: "40px 32px",
  textAlign: "center" as const,
  margin: "48px 0",
}

const ctaTitle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#1e293b",
  margin: "0 0 24px 0",
}

const buttonContainer = {
  margin: "24px 0",
}

const primaryButton = {
  backgroundColor: "#2563eb",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  padding: "16px 32px",
  boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.39)",
}

const ctaSubtext = {
  fontSize: "14px",
  color: "#64748b",
  margin: "16px 0 0 0",
}

const quickStartSection = {
  margin: "48px 0",
}

const quickStartTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1e293b",
  textAlign: "center" as const,
  margin: "0 0 32px 0",
}

const stepsList = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
}

const step = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "16px",
}

const stepNumber = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 16px 0 0",
}

const stepText = {
  fontSize: "16px",
  color: "#374151",
  margin: "0",
}

const supportSection = {
  backgroundColor: "#fffbeb",
  borderRadius: "12px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "48px 0",
}

const supportTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#92400e",
  margin: "0 0 16px 0",
}

const supportText = {
  fontSize: "16px",
  color: "#92400e",
  lineHeight: "24px",
  margin: "0 0 24px 0",
}

const supportButtons = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  flexWrap: "wrap" as const,
}

const secondaryButton = {
  backgroundColor: "#f59e0b",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  padding: "12px 24px",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "48px 0 32px 0",
}

const footer = {
  textAlign: "center" as const,
}

const footerWelcome = {
  fontSize: "18px",
  color: "#1e293b",
  fontWeight: "bold",
  margin: "0 0 8px 0",
}

const footerSignature = {
  fontSize: "16px",
  color: "#475569",
  margin: "0 0 24px 0",
  fontStyle: "italic",
}

const footerEmail = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 16px 0",
}

const footerSmall = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
}