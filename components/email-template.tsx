import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface EmailTemplateProps {
    name: string;
    email: string;
    plan: string;
    productDescription: string;
  }
  
  export const EmailTemplate = ({
    name,
    email,
    plan,
    productDescription,
  }: EmailTemplateProps) => {
    return (
      <Html>
        <Head />
        <Preview>Third Generation Studios - Form Submission from {name}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={heading}>Submission</Heading>
            <Section style={section}>
              <Text style={fieldLabel}>Name:</Text>
              <Text style={fieldValue}>{name}</Text>
  
              <Text style={fieldLabel}>Email:</Text>
              <Text style={fieldValue}>{email}</Text>
  
              <Text style={fieldLabel}>Selected Plan:</Text>
              <Text style={fieldValue}>{plan}</Text>
  
              <Text style={fieldLabel}>Product Description:</Text>
              <Text style={fieldValue}>{productDescription}</Text>
            </Section>
            <Text style={footer}>
              This is an automated message from your contact form.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  
  const heading = {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#1f2937',
    padding: '0 48px',
    margin: '20px 0',
  };
  
  const section = {
    padding: '0 48px',
  };
  
  const fieldLabel = {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
  };
  
  const fieldValue = {
    fontSize: '16px',
    color: '#1f2937',
    marginTop: '0',
    marginBottom: '24px',
  };
  
  const footer = {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
    marginTop: '32px',
  };
  
  export default EmailTemplate;