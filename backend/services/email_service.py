# Dbanyan Group - Email Service
# Professional email functionality with templates

import aiosmtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from jinja2 import Environment, DictLoader
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class EmailService:
    """Professional email service for Dbanyan Group"""
    
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.from_email = os.getenv("FROM_EMAIL", self.smtp_username)
        self.from_name = os.getenv("FROM_NAME", "Dbanyan Group")
        
        # Email templates
        self.templates = {
            'welcome': """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2C5F2D;">Welcome to Dbanyan Group!</h1>
                        <img src="https://via.placeholder.com/150x50/2C5F2D/FFFFFF?text=DBANYAN" alt="Dbanyan Logo" style="margin: 20px 0;">
                    </div>
                    
                    <h2 style="color: #2C5F2D;">Hello {{ name }}!</h2>
                    
                    <p>Welcome to the Dbanyan Group family! We're thrilled to have you join our community of health-conscious individuals who believe in the power of organic Moringa.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2C5F2D; margin-top: 0;">What's Next?</h3>
                        <ul style="margin: 0;">
                            <li>Explore our premium Moringa products</li>
                            <li>Learn about the incredible health benefits</li>
                            <li>Join our wellness community</li>
                            <li>Get exclusive offers and health tips</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{ website_url }}" style="background: #2C5F2D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Our Products</a>
                    </div>
                    
                    <p>If you have any questions, our team is here to help. Simply reply to this email or contact us through our website.</p>
                    
                    <p>Stay healthy and green!</p>
                    <p><strong>The Dbanyan Group Team</strong></p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center;">
                        © {{ year }} Dbanyan Group. All rights reserved.<br>
                        Premium Organic Moringa Products for Your Health
                    </p>
                </div>
            </body>
            </html>
            """,
            
            'password_reset': """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2C5F2D;">Password Reset Request</h1>
                        <img src="https://via.placeholder.com/150x50/2C5F2D/FFFFFF?text=DBANYAN" alt="Dbanyan Logo" style="margin: 20px 0;">
                    </div>
                    
                    <h2 style="color: #2C5F2D;">Hello {{ name }}!</h2>
                    
                    <p>We received a request to reset your password for your Dbanyan Group account.</p>
                    
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{ reset_url }}" style="background: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Your Password</a>
                    </div>
                    
                    <p>This link will expire in <strong>{{ expiry_hours }} hours</strong> for your security.</p>
                    
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 3px;">{{ reset_url }}</p>
                    
                    <p>Best regards,</p>
                    <p><strong>The Dbanyan Group Team</strong></p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center;">
                        © {{ year }} Dbanyan Group. All rights reserved.<br>
                        Premium Organic Moringa Products for Your Health
                    </p>
                </div>
            </body>
            </html>
            """,
            
            'order_confirmation': """
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2C5F2D;">Order Confirmation</h1>
                        <img src="https://via.placeholder.com/150x50/2C5F2D/FFFFFF?text=DBANYAN" alt="Dbanyan Logo" style="margin: 20px 0;">
                    </div>
                    
                    <h2 style="color: #2C5F2D;">Thank You, {{ name }}!</h2>
                    
                    <p>Your order has been successfully placed and is being processed.</p>
                    
                    <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin: 0 0 10px 0; color: #155724;">Order Details</h3>
                        <p style="margin: 5px 0;"><strong>Order ID:</strong> {{ order_id }}</p>
                        <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹{{ total_amount }}</p>
                        <p style="margin: 5px 0;"><strong>Expected Delivery:</strong> {{ delivery_date }}</p>
                    </div>
                    
                    <h3 style="color: #2C5F2D;">Items Ordered:</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                        {% for item in items %}
                        <div style="border-bottom: 1px solid #dee2e6; padding: 10px 0; margin-bottom: 10px;">
                            <strong>{{ item.name }}</strong><br>
                            Quantity: {{ item.quantity }} | Price: ₹{{ item.price }}
                        </div>
                        {% endfor %}
                    </div>
                    
                    <p>We'll send you tracking information once your order ships.</p>
                    
                    <p>Thank you for choosing Dbanyan Group for your wellness journey!</p>
                    <p><strong>The Dbanyan Group Team</strong></p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center;">
                        © {{ year }} Dbanyan Group. All rights reserved.<br>
                        Premium Organic Moringa Products for Your Health
                    </p>
                </div>
            </body>
            </html>
            """
        }
        
        self.jinja_env = Environment(loader=DictLoader(self.templates))
    
    async def send_email(
        self, 
        to_email: str, 
        subject: str, 
        template_name: str, 
        template_data: dict,
        to_name: Optional[str] = None
    ) -> bool:
        """Send email using template"""
        try:
            if not all([self.smtp_username, self.smtp_password]):
                logger.error("SMTP credentials not configured")
                return False
            
            # Render template
            template = self.jinja_env.get_template(template_name)
            html_body = template.render(**template_data)
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = f"{to_name} <{to_email}>" if to_name else to_email
            
            # Add HTML part
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Send email
            async with aiosmtplib.SMTP(hostname=self.smtp_server, port=self.smtp_port) as server:
                await server.starttls()
                await server.login(self.smtp_username, self.smtp_password)
                await server.send_message(msg)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    async def send_welcome_email(self, to_email: str, name: str) -> bool:
        """Send welcome email to new users"""
        from datetime import datetime
        
        template_data = {
            'name': name,
            'website_url': os.getenv('FRONTEND_URL', 'http://localhost:5173'),
            'year': datetime.now().year
        }
        
        return await self.send_email(
            to_email=to_email,
            subject="Welcome to Dbanyan Group - Your Wellness Journey Begins!",
            template_name='welcome',
            template_data=template_data,
            to_name=name
        )
    
    async def send_password_reset_email(self, to_email: str, name: str, reset_token: str) -> bool:
        """Send password reset email"""
        from datetime import datetime
        
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
        reset_url = f"{frontend_url}/reset-password?token={reset_token}"
        
        template_data = {
            'name': name,
            'reset_url': reset_url,
            'expiry_hours': 24,
            'year': datetime.now().year
        }
        
        return await self.send_email(
            to_email=to_email,
            subject="Dbanyan Group - Password Reset Request",
            template_name='password_reset',
            template_data=template_data,
            to_name=name
        )
    
    async def send_order_confirmation_email(self, to_email: str, name: str, order_data: dict) -> bool:
        """Send order confirmation email"""
        from datetime import datetime, timedelta
        
        # Calculate expected delivery (7-10 business days)
        delivery_date = (datetime.now() + timedelta(days=7)).strftime("%B %d, %Y")
        
        template_data = {
            'name': name,
            'order_id': order_data.get('order_id'),
            'total_amount': order_data.get('total_amount'),
            'delivery_date': delivery_date,
            'items': order_data.get('items', []),
            'year': datetime.now().year
        }
        
        return await self.send_email(
            to_email=to_email,
            subject=f"Order Confirmation - #{order_data.get('order_id')} - Dbanyan Group",
            template_name='order_confirmation',
            template_data=template_data,
            to_name=name
        )

# Global email service instance
email_service = EmailService()
