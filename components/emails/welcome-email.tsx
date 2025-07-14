import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  userEmail: string;
  userName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const WelcomeEmail = ({ userEmail, userName }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Stocker - Your Stock Management Platform</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with gradient background */}
        <Section style={header}>
          <Img
            src="https://gcdnb.pbrd.co/images/OPvWenHrwOqh.png?o=1"
            alt="Stocker"
            style={logo}
          />
        </Section>

        {/* Main content card */}
        <Section style={card}>
          <Heading style={h1}>Welcome to Stocker!</Heading>
          <Text style={heroText}>
            Hi there! We're excited to have you join the Stocker community. 
            You now have access to a comprehensive stock management platform designed to help you succeed.
          </Text>

          {/* Features section */}
          <Section style={featuresSection}>
            <Heading style={h2}>What you can do with Stocker:</Heading>
            
            <Section style={featureItem}>
              <div style={featureIcon}>🔐</div>
              <Text style={featureTitle}>Secure Authentication</Text>
              <Text style={featureDescription}>
                OTP-based secure login system to protect your account and data
              </Text>
            </Section>

            <Section style={featureItem}>
              <div style={featureIcon}>📊</div>
              <Text style={featureTitle}>Stock Analysis</Text>
              <Text style={featureDescription}>
                Advanced analytics and insights to make informed investment decisions
              </Text>
            </Section>

            <Section style={featureItem}>
              <div style={featureIcon}>📈</div>
              <Text style={featureTitle}>Profit Tracking</Text>
              <Text style={featureDescription}>
                Track, manage, and optimize your profit with ease
              </Text>
            </Section>

            <Section style={featureItem}>
              <div style={featureIcon}>🗂️</div>
              <Text style={featureTitle}>Data Management</Text>
              <Text style={featureDescription}>
                Organize and manage your financial data efficiently and securely
              </Text>
            </Section>
          </Section>

          {/* Call to action */}
          <Section style={ctaSection}>
            <Button
              style={ctaButton}
              href="https://dashboard-app-two-sigma.vercel.app/dashboard"
            >
              Get Started Now
            </Button>
            <Text style={ctaText}>
              Ready to take control of your investments? Click above to access your dashboard.
            </Text>
          </Section>

          {/* Decorative divider */}
          <Section style={divider}></Section>

          {/* Footer with social links */}
          <Section>
            <Text style={footerText}>Follow us on</Text>
            <Row style={socialLinks}>
              <Column style={socialColumn}>
                <Link href="https://twitter.com" style={socialLink}>
                  <Img
                    src={`https://iconape.com/wp-content/png_logo_vector/twitter-icon-square-logo.png`}
                    width="24"
                    height="24"
                    alt="Twitter"
                    style={socialIcon}
                  />
                  <span style={socialText}>Twitter</span>
                </Link>
              </Column>
              <Column style={socialColumn}>
                <Link href="https://facebook.com" style={socialLink}>
                  <Img
                    src={`https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png`}
                    width="24"
                    height="24"
                    alt="Facebook"
                    style={socialIcon}
                  />
                  <span style={socialText}>Facebook</span>
                </Link>
              </Column>
              <Column style={socialColumn}>
                <Link href="https://linkedin.com" style={socialLink}>
                  <Img
                    src={`https://img.freepik.com/premium-vector/blue-white-linkedin-icon-blue-background_462839-1656.jpg`}
                    width="24"
                    height="24"
                    alt="LinkedIn"
                    style={socialIcon}
                  />
                  <span style={socialText}>LinkedIn</span>
                </Link>
              </Column>
            </Row>
          </Section>
        </Section>

        {/* Footer links */}
        <Section style={footer}>
          <Link
            style={footerLink}
            href="https://Stockerhq.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our blog
          </Link>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://Stocker.com/legal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policies
          </Link>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://Stocker.com/help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help center
          </Link>
          <Text style={copyright}>
            ©{new Date().getFullYear()} Stocker Technologies<br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  padding: '20px 0',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
};

const header = {
  background: '#2d5fe6',
  padding: '40px 20px',
  textAlign: 'center' as const,
  borderRadius: '8px 8px 0 0',
};

const logo = {
  height: '70px',
  margin: '0 auto',
  width: '240px',
};

const card = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '0 0 8px 8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const h1 = {
  color: '#2e61e7',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#2e61e7',
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 25px',
  textAlign: 'center' as const,
};

const heroText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#525f7f',
  margin: '0 0 30px',
  textAlign: 'center' as const,
};

const featuresSection = {
  margin: '0 0 40px',
};

const featureItem = {
  margin: '0 0 30px',
  textAlign: 'center' as const,
};

const featureIcon = {
  fontSize: '32px',
  textAlign: 'center' as const,
  margin: '0 0 10px',
};

const featureTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2e61e7',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const featureDescription = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#525f7f',
  margin: '0',
  textAlign: 'center' as const,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '0 0 30px',
};

const ctaButton = {
  backgroundColor: '#2e61e7',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 30px',
  margin: '0 0 15px',
};

const ctaText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#525f7f',
  margin: '0',
};

const divider = {
  height: '1px',
  backgroundColor: '#e0e6ed',
  margin: '30px 0',
};

const socialLinks = {
  margin: '0 auto 30px',
  width: '100%',
};

const socialColumn = {
  width: '33%',
  display: 'inline-block',
  verticalAlign: 'top',
};

const socialLink = {
  display: 'block',
  textAlign: 'center' as const,
  textDecoration: 'none',
  color: '#525f7f',
};

const socialIcon = {
  display: 'block',
  margin: '0 auto 8px',
};

const socialText = {
  fontSize: '12px',
};

const footer = {
  textAlign: 'center' as const,
  padding: '20px 0',
};

const footerLink = {
  color: '#8898aa',
  fontSize: '12px',
  textDecoration: 'none',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  margin: '0 0 10px',
};

const copyright = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '20px 0 0',
};