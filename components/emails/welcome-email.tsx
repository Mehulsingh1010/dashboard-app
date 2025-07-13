import { Html, Head, Body, Container, Section, Text, Heading, Button, Hr, Img } from "@react-email/components"

interface WelcomeEmailProps {
  email: string
}

const main = {
  backgroundColor: "#0f0f23", // Deep dark background
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: "0",
  padding: "40px 20px",
  lineHeight: "1.6",
}

const container = {
  backgroundColor: "#1a1a2e", // Dark container
  margin: "0 auto",
  maxWidth: "650px",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 32px 64px -12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)",
  border: "1px solid rgba(139, 92, 246, 0.2)",
}

const headerSection = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%)",
  padding: "60px 40px",
  textAlign: "center" as const,
  position: "relative" as const,
}

const logoContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}

const logoImg = {
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "8px",
  marginRight: "12px",
  backdropFilter: "blur(10px)",
}

const appName = {
  color: "#ffffff",
  fontSize: "42px",
  fontWeight: "800",
  margin: "0",
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  letterSpacing: "-0.02em",
}

const tagline = {
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "18px",
  margin: "0",
  fontWeight: "500",
  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
}

const content = {
  padding: "0",
}

const welcomeSection = {
  padding: "60px 40px 40px",
  textAlign: "center" as const,
  background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
}

const heading = {
  fontSize: "48px",
  fontWeight: "900",
  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
  letterSpacing: "-0.02em",
}

const subheading = {
  fontSize: "20px",
  color: "#a1a1aa",
  margin: "0 0 40px 0",
  fontWeight: "400",
  lineHeight: "1.5",
}

const successBadge = {
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  borderRadius: "50px",
  padding: "20px 40px",
  textAlign: "center" as const,
  margin: "0 auto 60px",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
}

const successIcon = {
  fontSize: "28px",
  margin: "0 12px 0 0",
}

const successText = {
  fontSize: "18px",
  color: "#ffffff",
  fontWeight: "700",
  margin: "0",
}

const featuresSection = {
  padding: "60px 40px",
  background: "#16213e",
}

const featuresTitle = {
  fontSize: "32px",
  fontWeight: "800",
  color: "#ffffff",
  textAlign: "center" as const,
  margin: "0 0 60px 0",
}

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "32px",
  margin: "0 auto",
  maxWidth: "800px",
}

const featureCard = {
  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "20px",
  padding: "40px 32px",
  textAlign: "center" as const,
  transition: "transform 0.3s ease",
  backdropFilter: "blur(10px)",
}

const featureIcon = {
  fontSize: "48px",
  margin: "0 0 20px 0",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
}

const featureTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0 0 16px 0",
}

const featureDescription = {
  fontSize: "16px",
  color: "#a1a1aa",
  lineHeight: "1.6",
  margin: "0",
}

const ctaSection = {
  padding: "80px 40px",
  textAlign: "center" as const,
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
}

const ctaTitle = {
  fontSize: "36px",
  fontWeight: "800",
  color: "#ffffff",
  margin: "0 0 40px 0",
  lineHeight: "1.2",
}

const buttonContainer = {
  margin: "40px 0",
}

const primaryButton = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
  borderRadius: "50px",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "700",
  textDecoration: "none",
  display: "inline-block",
  padding: "20px 48px",
  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
  transition: "all 0.3s ease",
  border: "none",
}

const ctaSubtext = {
  fontSize: "16px",
  color: "#a1a1aa",
  margin: "24px 0 0 0",
}

const quickStartSection = {
  padding: "60px 40px",
  background: "rgba(139, 92, 246, 0.05)",
}

const quickStartTitle = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#ffffff",
  textAlign: "center" as const,
  margin: "0 0 40px 0",
}

const stepsList = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
  maxWidth: "600px",
  margin: "0 auto",
}

const step = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.03)",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}

const stepNumber = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
  color: "#ffffff",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 24px 0 0",
  boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)",
}

const stepText = {
  fontSize: "18px",
  color: "#e4e4e7",
  margin: "0",
  fontWeight: "500",
}

const supportSection = {
  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
  borderRadius: "20px",
  padding: "40px",
  textAlign: "center" as const,
  margin: "60px 40px",
  border: "1px solid rgba(16, 185, 129, 0.2)",
}

const supportTitle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#ffffff",
  margin: "0 0 20px 0",
}

const supportText = {
  fontSize: "18px",
  color: "#a1a1aa",
  lineHeight: "1.6",
  margin: "0 0 32px 0",
}

const hr = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "60px 40px 40px",
}

const footer = {
  textAlign: "center" as const,
  padding: "0 40px 60px",
}

const footerWelcome = {
  fontSize: "24px",
  color: "#ffffff",
  fontWeight: "800",
  margin: "0 0 12px 0",
}

const footerSignature = {
  fontSize: "18px",
  color: "#a1a1aa",
  margin: "0 0 32px 0",
  fontStyle: "italic",
}

const footerEmail = {
  fontSize: "16px",
  color: "#71717a",
  margin: "0 0 20px 0",
}

const footerSmall = {
  fontSize: "14px",
  color: "#52525b",
  margin: "0",
}

export function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Stunning Header */}
          <Section style={headerSection}>
            <div style={logoContainer}>
              <Img src="/placeholder.svg?height=48&width=48" alt="StockFlow Logo" style={logoImg} />
              <Text style={appName}>StockFlow</Text>
            </div>
            <Text style={tagline}>Inventory Management Reimagined</Text>
          </Section>

          <Section style={content}>
            {/* Welcome Hero */}
            <div style={welcomeSection}>
              <Heading style={heading}>Welcome to the Future</Heading>
              <Text style={subheading}>
                🚀 Your account is now active and ready to transform how you manage inventory
              </Text>
              
              <div style={successBadge}>
                <Text style={successIcon}>✨</Text>
                <Text style={successText}>Account Successfully Activated</Text>
              </div>
            </div>

            {/* Premium Features */}
            <div style={featuresSection}>
              <Text style={featuresTitle}>🔥 What Makes Us Different</Text>
              <div style={featureGrid}>
                <div style={featureCard}>
                  <Text style={featureIcon}>🧠</Text>
                  <Text style={featureTitle}>AI-Powered Insights</Text>
                  <Text style={featureDescription}>
                    Advanced machine learning algorithms predict demand and optimize your inventory automatically
                  </Text>
                </div>
                <div style={featureCard}>
                  <Text style={featureIcon}>⚡</Text>
                  <Text style={featureTitle}>Real-Time Everything</Text>
                  <Text style={featureDescription}>
                    Lightning-fast updates across all devices with millisecond precision tracking
                  </Text>
                </div>
                <div style={featureCard}>
                  <Text style={featureIcon}>🎯</Text>
                  <Text style={featureTitle}>Smart Automation</Text>
                  <Text style={featureDescription}>
                    Intelligent workflows that handle routine tasks while you focus on growth
                  </Text>
                </div>
                <div style={featureCard}>
                  <Text style={featureIcon}>🌐</Text>
                  <Text style={featureTitle}>Global Scale</Text>
                  <Text style={featureDescription}>
                    Multi-location, multi-currency support with enterprise-grade security
                  </Text>
                </div>
              </div>
            </div>

            {/* CTA Hero */}
            <div style={ctaSection}>
              <Text style={ctaTitle}>Ready to Experience the Magic?</Text>
              <div style={buttonContainer}>
                <Button href="#" style={primaryButton}>
                  ✨ Enter Your Dashboard
                </Button>
              </div>
              <Text style={ctaSubtext}>Complete setup in under 60 seconds</Text>
            </div>

            {/* Quick Start */}
            <div style={quickStartSection}>
              <Text style={quickStartTitle}>🎯 Get Started in 3 Steps</Text>
              <div style={stepsList}>
                <div style={step}>
                  <div style={stepNumber}>1</div>
                  <Text style={stepText}>Connect your existing inventory data or start fresh</Text>
                </div>
                <div style={step}>
                  <div style={stepNumber}>2</div>
                  <Text style={stepText}>Configure your smart alerts and automation rules</Text>
                </div>
                <div style={step}>
                  <div style={stepNumber}>3</div>
                  <Text style={stepText}>Watch as AI optimizes your inventory in real-time</Text>
                </div>
              </div>
            </div>

            {/* Support */}
            <div style={supportSection}>
              <Text style={supportTitle}>💎 Premium Support Included</Text>
              <Text style={supportText}>
                24/7 expert support, dedicated onboarding specialist, and priority feature requests - all included with your account.
              </Text>
            </div>

            <Hr style={hr} />

            {/* Footer */}
            <div style={footer}>
              <Text style={footerWelcome}>Welcome to the Revolution! 🎉</Text>
              <Text style={footerSignature}>The StockFlow Innovation Team</Text>
              <Text style={footerEmail}>
                Sent to <strong>{email}</strong>
              </Text>
              <Text style={footerSmall}>© 2025 StockFlow. Transforming inventory management worldwide.</Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}