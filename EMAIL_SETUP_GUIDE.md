# Email Setup Instructions for Dbanyan Group

## Overview
This guide will help you configure email functionality for password reset and other email features in the Dbanyan Group application.

## Gmail App Password Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security" → "2-Step Verification"
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to "Security" → "App passwords"
2. Select "Mail" and your device/app name
3. Google will generate a 16-character app password
4. Copy this password (you won't see it again)

### Step 3: Update Backend Configuration
1. Open `backend/.env` file
2. Update the following variables:

```env
# Replace with your actual Gmail credentials
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Dbanyan Group
FRONTEND_URL=http://localhost:5173
```

## Testing Email Functionality

### 1. Start the Backend
```powershell
cd backend
uvicorn main:app --reload
```

### 2. Test Forgot Password
1. Go to http://localhost:5173/forgot-password
2. Enter a valid email address (the one you configured)
3. Check your email inbox for the reset email
4. Click the reset link to test the complete flow

### 3. Backend Logs
Check the backend console for email-related logs:
- "Password reset email sent successfully to: [email]"
- "Password reset initiated for user: [email]"

## Troubleshooting

### Common Issues

#### 1. "Authentication failed" Error
- **Cause**: Incorrect email/password or app password not set up
- **Solution**: 
  - Verify 2FA is enabled
  - Generate a new app password
  - Double-check credentials in .env file

#### 2. "SMTP connect failed" Error
- **Cause**: Network/firewall issues or incorrect SMTP settings
- **Solution**: 
  - Verify SMTP_SERVER=smtp.gmail.com
  - Verify SMTP_PORT=587
  - Check firewall/antivirus settings

#### 3. Emails Not Received
- **Cause**: Emails might be in spam folder or email not configured properly
- **Solution**: 
  - Check spam/junk folder
  - Verify FROM_EMAIL matches SMTP_USERNAME
  - Test with a different email provider

### Email Service Status Check

Add this endpoint to test email configuration:

```python
@router.get("/test-email")
async def test_email():
    """Test email configuration"""
    try:
        from services.email_service import email_service
        result = await email_service.send_email(
            to_email="test@example.com",
            subject="Test Email",
            template_name="welcome",
            template_data={"name": "Test User", "website_url": "http://localhost:5173", "year": 2025}
        )
        return {"success": result, "message": "Email test completed"}
    except Exception as e:
        return {"success": False, "error": str(e)}
```

## Alternative Email Providers

### Using Other SMTP Services

#### Outlook/Hotmail
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=your-email@outlook.com
SMTP_PASSWORD=your-password
```

#### Custom SMTP (e.g., hosting provider)
```env
SMTP_SERVER=mail.yourdomain.com
SMTP_PORT=587
SMTP_USERNAME=noreply@yourdomain.com
SMTP_PASSWORD=your-password
```

## Security Best Practices

1. **Never commit .env file**: Already added to .gitignore
2. **Use app passwords**: Never use your main account password
3. **Rotate passwords**: Change app passwords periodically
4. **Monitor logs**: Check for suspicious email activity
5. **Rate limiting**: Consider adding rate limits to prevent spam

## Production Deployment

### Environment Variables
When deploying to production, set these environment variables:

```env
SMTP_USERNAME=production-email@yourdomain.com
SMTP_PASSWORD=production-app-password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Dbanyan Group
FRONTEND_URL=https://yourdomain.com
```

### Email Templates
The current templates are optimized for the Dbanyan Group brand. Customize in `services/email_service.py`:

- **Welcome Email**: Sent on user registration
- **Password Reset**: Sent on forgot password request
- **Order Confirmation**: Sent after successful purchase

## Monitoring and Analytics

Consider adding email tracking:
1. Open rates
2. Click-through rates
3. Bounce rates
4. Delivery status

## Contact Information

For technical support with email setup:
- Check the application logs first
- Verify all environment variables
- Test with a simple email service like Gmail
- Contact the development team if issues persist

---

**Note**: This setup ensures secure, professional email communication for the Dbanyan Group e-commerce platform.
