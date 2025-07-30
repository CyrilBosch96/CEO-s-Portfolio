# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form to send emails to the CEO.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps for your chosen provider
5. Note down the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your website contact form:

**From:** {{from_name}} ({{from_email}})
**Subject:** {{subject}}
**Message:**

{{message}}

---
This message was sent from your website contact form.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update the Contact Form

1. Open `src/pages/Contact.tsx`
2. Replace the placeholder values with your actual credentials:

```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out the form and submit
4. Check if the email is received at `cyril.jp@techjays.com`

## Troubleshooting

- **Email not sending**: Check that all EmailJS credentials are correct
- **Template variables not working**: Make sure your template uses the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
- **Service not working**: Verify your email service is properly connected in EmailJS dashboard

## Security Notes

- The public key is safe to use in frontend code
- EmailJS handles the email sending server-side
- No sensitive credentials are exposed to users

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic templates
- Standard support

For higher volumes, consider upgrading to a paid plan. 