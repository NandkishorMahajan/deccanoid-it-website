import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface ContactFormData {
  from_name: string;
  from_email: string;
  phone: string;
  company?: string;
  service: string;
  project_details: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate environment variables
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.from_name,
        from_email: formData.from_email,
        phone: formData.phone,
        company: formData.company || '—',
        service: formData.service,
        project_details: formData.project_details,
        submitted_at: new Date().toLocaleString(),
        to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'deccanoid@gmail.com',
      },
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send email');
  }
};
