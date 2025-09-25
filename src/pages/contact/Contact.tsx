import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Navigation from "@/navigation/Navigation";
import { Button } from "@/components/ui/display/button";
import { Input } from "@/components/ui/forms/input";
import { Textarea } from "@/components/ui/forms/textarea";
import { Label } from "@/components/ui/forms/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/display/card";
import { Alert, AlertDescription } from "@/components/ui/feedback/alert";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_3y7z8r8';
  const EMAILJS_TEMPLATE_ID_CEO = 'template_cojz4ml'; // Template for CEO notification
  const EMAILJS_TEMPLATE_ID_SENDER = 'template_sender_confirmation'; // Template for sender confirmation
  const EMAILJS_PUBLIC_KEY = '0fAPlrYg662S4MZka';
  const CEO_EMAIL = 'bavanikannan@techjays.com';

  // EmailJS is properly configured with real credentials
  const isEmailJSConfigured = true;


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    console.log('Form validation passed, starting email send...');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Check if EmailJS is configured
      if (!isEmailJSConfigured) {
        throw new Error('EmailJS is not configured. Please set up your EmailJS credentials.');
      }


      // Prepare template parameters for CEO notification
      const ceoTemplateParams = {
        to_email: CEO_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };

      // Prepare template parameters for sender confirmation
      const senderTemplateParams = {
        to_email: formData.email,
        from_name: 'Philip Samuelraj',
        to_name: `${formData.firstName} ${formData.lastName}`,
        subject: `Thank you for your message: ${formData.subject}`,
        message: `Dear ${formData.firstName},\n\nThank you for reaching out to me. I have received your message and will get back to you within 24-48 hours.\n\nYour message:\n"${formData.message}"\n\nBest regards,\nPhilip Samuelraj\nCEO, Techjays`,
        reply_to: CEO_EMAIL
      };

      // Send email to CEO first
      console.log('Sending CEO email with params:', ceoTemplateParams);
      const ceoResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CEO,
        ceoTemplateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('CEO email response:', ceoResponse);


      if (ceoResponse.status === 200) {
        // Try to send confirmation email to sender (optional)
        try {
          console.log('Sending sender confirmation email with params:', senderTemplateParams);
          const senderResponse = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_SENDER,
            senderTemplateParams,
            EMAILJS_PUBLIC_KEY
          );
          console.log('Sender email response:', senderResponse);
          
          if (senderResponse.status === 200) {
            console.log('Both emails sent successfully');
          }
        } catch (senderError) {
          console.warn('Sender confirmation email failed, but CEO email was sent:', senderError);
          // Don't fail the whole process if sender email fails
        }

        setSubmitStatus('success');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error('Failed to send email to CEO');
      }
    } catch (error: any) {
      console.error('Email sending error:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text
      });
      setSubmitStatus('error');
      
      // Set specific error message
      if (error.message?.includes('EmailJS is not configured')) {
        setErrorMessage('Email service is not configured yet. Please contact the administrator.');
      } else if (error.message?.includes('Invalid service ID')) {
        setErrorMessage('Email service configuration error. Please try again later.');
      } else if (error.message?.includes('Invalid template ID')) {
        setErrorMessage('Email template configuration error. Please try again later.');
      } else {
        setErrorMessage('There was an error sending your message. Please try again or contact me directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to right, white, #a8b2d1, #c4b5fd)' }}>
      <Navigation />
      
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Connect for business opportunities, partnerships, or thought leadership discussions
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Send a Message
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              {!isEmailJSConfigured && (
                <Alert className="mb-6 border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 text-sm">
                    ⚠️ Email service is not configured yet. Please follow the setup guide in EMAILJS_SETUP.md to enable email functionality.
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === 'success' && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 text-sm">
                    Thank you for your message! I've received your message and sent you a confirmation email. I'll get back to you within 24-48 hours.
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 text-sm">
                    {errorMessage || "There was an error sending your message. Please try again or contact me directly."}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-300 focus:border-red-500" : ""}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-300 focus:border-red-500" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-300 focus:border-red-500" : ""}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? "border-red-300 focus:border-red-500" : ""}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`min-h-[120px] ${errors.message ? "border-red-300 focus:border-red-500" : ""}`}
                    placeholder="Tell me more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                  For urgent matters, please include "URGENT" in your subject line. 
                  All inquiries are handled with complete confidentiality.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;
