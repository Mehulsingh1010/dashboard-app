import {
  Body,
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

interface OTPEmailProps {
  otp: string;
  email: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const OTPEmail=({ otp, email }: OTPEmailProps) =>(
  <Html>
    <Head />
    <Preview>Your Stocker verification code</Preview>
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
          <Heading style={h1}>Verify Your Email</Heading>
          <Text style={heroText}>
            Hi there! Please use the following verification code to confirm your email address:
          </Text>

          {/* OTP Code with modern design */}
          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{otp}</Text>
          </Section>

          <Text style={text}>
            This code will expire in 10 minutes. If you didn't request this email, please ignore it.
          </Text>

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
  width:"240px"

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

const heroText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#525f7f',
  margin: '0 0 30px',
  textAlign: 'center' as const,
};

const codeBox = {
  background: 'linear-gradient(to right, #f6f9fc, #ffffff)',
  borderRadius: '8px',
  margin: '0 auto 30px',
  padding: '20px',
  textAlign: 'center' as const,
  border: '1px solid #e0e6ed',
};

const confirmationCodeText = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#2e61e7',
  letterSpacing: '4px',
  margin: '0',
};

const text = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center' as const,
  margin: '0 0 30px',
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



