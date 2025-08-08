# Email Configuration Setup

## Setting up Email for Booking Confirmations

### 1. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication:**

   - Go to [Google Account Settings](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**

   - Go to Security > 2-Step Verification > App passwords
   - Select "Mail" and "Other" (enter "Famous Tours App")
   - Copy the generated 16-character password

3. **Update Environment Variables:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   COMPANY_EMAIL=bookings@famoustours.lk
   ```

### 2. Other Email Providers

Update the `service` in `/app/api/send-booking/route.ts`:

**Outlook/Hotmail:**

```javascript
service: "hotmail";
```

**Yahoo:**

```javascript
service: "yahoo";
```

**Custom SMTP:**

```javascript
host: 'smtp.your-provider.com',
port: 587,
secure: false,
```

### 3. Testing

1. Fill out the booking form with a valid email
2. Submit the form
3. Check:
   - Email inbox for confirmation
   - Downloads folder for PDF
   - Console for any errors

### 4. Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not your main password
- Consider using a dedicated email account for the application

### 5. Troubleshooting

**Email not sending:**

- Check environment variables are set correctly
- Verify app password is correct
- Check Gmail settings allow less secure apps (if not using app password)

**PDF not generating:**

- Check browser console for errors
- Ensure all form fields are filled correctly

**SMTP errors:**

- Verify email provider settings
- Check firewall/antivirus blocking SMTP
