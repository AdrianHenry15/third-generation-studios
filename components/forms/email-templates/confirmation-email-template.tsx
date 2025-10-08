import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

interface ConfirmationEmailTemplateProps {
    name: string;
    email: string;
    plan: string;
}

export const ConfirmationEmailTemplate = ({ name, email, plan }: ConfirmationEmailTemplateProps) => {
    return (
        <Html>
            <Head />
            <Preview>Thank you for contacting Third Generation Studios, {name}!</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header Bar */}
                    <div style={{ ...headerBar, minHeight: 42, fontSize: 16, justifyContent: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: 1 }}>Third Generation Studios</span>
                    </div>
                    <Heading style={heading}>Thank You for Your Submission!</Heading>
                    <Section style={section}>
                        <Text style={{ fontSize: 16, color: "#374151", marginBottom: 24 }}>
                            Hi {name},<br />
                            <br />
                            We have received your request and will get back to you as soon as possible. Here is a summary of your
                            submission:
                        </Text>
                        <div style={{ ...row, justifyContent: "center" }}>
                            <span style={{ ...fieldLabel, minWidth: 140, textAlign: "right", display: "inline-block" }}>Name:</span>
                            <span style={{ ...fieldValue, textAlign: "left", marginLeft: 16 }}>{name}</span>
                        </div>
                        <div style={{ ...row, justifyContent: "center" }}>
                            <span style={{ ...fieldLabel, minWidth: 140, textAlign: "right", display: "inline-block" }}>Email:</span>
                            <span style={{ ...fieldValue, textAlign: "left", marginLeft: 16 }}>{email}</span>
                        </div>
                        <div style={{ ...row, justifyContent: "center" }}>
                            <span style={{ ...fieldLabel, minWidth: 140, textAlign: "right", display: "inline-block" }}>
                                Selected Plan:
                            </span>
                            <span style={{ ...fieldValue, textAlign: "left", marginLeft: 16 }}>{plan}</span>
                        </div>
                        {/* <div style={{ ...row, justifyContent: "center" }}>
                            <span style={{ ...fieldLabel, minWidth: 140, textAlign: "right", display: "inline-block" }}>
                                Product Description:
                            </span>
                            <span style={{ ...fieldValue, textAlign: "left", marginLeft: 16 }}>{productDescription}</span>
                        </div> */}
                    </Section>
                    <div style={{ textAlign: "center", fontSize: "24px", color: "#d1d5db", margin: "16px 0" }}>…</div>
                    <Text style={footer}>
                        This is an automated confirmation from Third Generation Studios.
                        <br />
                        If you have any questions, reply to this email or visit{" "}
                        <span style={{ color: "#10b981", fontWeight: 600 }}>thirdgenerationstudios.com</span>.
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

export default ConfirmationEmailTemplate;
