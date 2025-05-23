import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
    name: string;
    email: string;
    plan: string;
    productDescription: string;
}

export const EmailTemplate = ({ name, email, plan, productDescription }: EmailTemplateProps) => {
    return (
        <Html>
            <Head />
            <Preview>Third Generation Studios - Form Submission from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header Bar */}
                    <div style={headerBar}>
                        <img
                            src="/logos/tgs-logo.png"
                            alt="Third Generation Studios Logo"
                            width={32}
                            height={32}
                            style={{ verticalAlign: "middle", marginRight: 12, borderRadius: 6 }}
                        />
                        <span style={{ fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: 1 }}>Third Generation Studios</span>
                    </div>
                    <Heading style={heading}>New Contact Submission</Heading>
                    <Section style={section}>
                        <div style={row}>
                            <span style={fieldLabel}>Name:</span>
                            <span style={fieldValue}>{name}</span>
                        </div>
                        <div style={row}>
                            <span style={fieldLabel}>Email:</span>
                            <span style={fieldValue}>{email}</span>
                        </div>
                        <div style={row}>
                            <span style={fieldLabel}>Selected Plan:</span>
                            <span style={fieldValue}>{plan}</span>
                        </div>
                        <div style={row}>
                            <span style={fieldLabel}>Product Description:</span>
                            <span style={fieldValue}>{productDescription}</span>
                        </div>
                    </Section>
                    <div style={divider}></div>
                    <Text style={footer}>
                        This is an automated message from your contact form.
                        <br />
                        <span style={{ color: "#10b981", fontWeight: 600 }}>thirdgenerationstudios.com</span>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const heading = {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#1f2937",
    padding: "0 48px",
    margin: "20px 0",
};

const section = {
    padding: "0 48px",
};

const fieldLabel = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "4px",
};

const fieldValue = {
    fontSize: "16px",
    color: "#1f2937",
    marginTop: "0",
    marginBottom: "24px",
};

const footer = {
    fontSize: "12px",
    color: "#6b7280",
    textAlign: "center" as const,
    marginTop: "32px",
};

const headerBar = {
    background: "linear-gradient(90deg, #10b981 0%, #6366f1 100%)",
    padding: "16px 48px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    marginBottom: 0,
};

const row = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 16,
    borderBottom: "1px solid #f3f4f6",
    paddingBottom: 8,
};

const divider = {
    borderTop: "1px solid #e5e7eb",
    margin: "32px 48px 0 48px",
};

export default EmailTemplate;
