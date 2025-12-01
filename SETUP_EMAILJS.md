# EmailJS Quick Setup Guide

## 🚀 Get Contact Form Submissions via Email

Your contact form is ready! Just follow these 5 simple steps:

---

## Step 1: Sign Up for EmailJS (FREE)
1. Go to [https://dashboard.emailjs.com/sign-up](https://dashboard.emailjs.com/sign-up)
2. Sign up with Google or email (it's free!)

---

## Step 2: Add Email Service
1. Click **"Add New Service"**
2. Choose **Gmail** (or your preferred email provider)
3. Click **"Connect Account"** and authorize EmailJS
4. **COPY YOUR SERVICE ID** (e.g., `service_abc123`)

---

## Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up your template:

**Template Settings:**
- Template Name: `Portfolio Contact Form`

**Email Subject:**
```
New Contact from {{from_name}}
```

**Email Body:**
```html
Hello Daniel,

You have received a new message from your portfolio website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from your portfolio contact form.
Reply to: {{from_email}}
```

4. **COPY YOUR TEMPLATE ID** (e.g., `template_xyz789`)

---

## Step 4: Get Public Key
1. Go to **"Account"** in the sidebar
2. Scroll to **"API Keys"** section
3. **COPY YOUR PUBLIC KEY** (e.g., `Abc123XyZ456`)

---

## Step 5: Add to Your .env File

Open (or create) `.env.local` in your project root and add:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Abc123XyZ456
```

**Replace** with your actual IDs from steps 2, 3, and 4!

---

## 🔄 Restart Your Dev Server

```bash
# Stop the server (Ctrl + C)
# Then restart
npm run dev
```

---

## ✅ Test It!

1. Go to your Contact section
2. Fill in the form:
   - **Name**: Your Name
   - **Email**: your@email.com
   - **Message**: Test message
3. Click **"Send Message"**
4. Check your email inbox! 📧

---

## 📧 What You'll Receive

Every time someone fills the form, you'll get an email with:

```
Subject: New Contact from [Their Name]

Name: John Doe
Email: john@example.com

Message:
Hi Daniel, I'd like to discuss a project...
```

---

## 🎯 Important Notes

- ✅ The form already sends: **name**, **email**, and **message**
- ✅ Free tier: **200 emails/month**
- ✅ `.env.local` is in `.gitignore` (safe from Git)
- ✅ Works without any backend server!

---

## 🌐 For Vercel Deployment

When you deploy to Vercel:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these 3 variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = `your_service_id`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = `your_template_id`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = `your_public_key`
3. Click **Save**
4. Redeploy your site

---

## 🆘 Troubleshooting

**"Failed to send" error:**
- Double-check your Service ID, Template ID, and Public Key
- Make sure you restarted the dev server after adding `.env.local`
- Check browser console for detailed errors

**Not receiving emails:**
- Check your spam folder
- Verify email service is properly connected in EmailJS
- Test the template in EmailJS dashboard first

---

## 📚 Helpful Links

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Video Tutorial](https://www.youtube.com/watch?v=dgcYOm8n8ME)

---

**That's it!** Your contact form will now send you emails with the name, email, and message from visitors. 🎉
