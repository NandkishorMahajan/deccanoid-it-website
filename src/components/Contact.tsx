import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';
import emailjs from '@emailjs/browser';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sanitizeText = (value: string) => {
    return value
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const sanitizeMultiline = (value: string) => {
    return value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
      .replace(/[<>]/g, '')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPhone = (value: string) => {
    return /^[0-9+\-() ]{7,20}$/.test(value);
  };

  const formatDateTime = (d: Date) => {
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setErrorMessage(null);
    setSubmitStatus('idle');

    const name = sanitizeText(formData.name);
    const email = sanitizeText(formData.email).toLowerCase();
    const phone = sanitizeText(formData.phone);
    const company = sanitizeText(formData.company);
    const service = sanitizeText(formData.service);
    const message = sanitizeMultiline(formData.message);

    if (!name || name.length < 2) {
      setErrorMessage('Please enter your full name.');
      setSubmitStatus('error');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }
    if (!isValidPhone(phone)) {
      setErrorMessage('Please enter a valid phone number.');
      setSubmitStatus('error');
      return;
    }
    if (!service) {
      setErrorMessage('Please select a service.');
      setSubmitStatus('error');
      return;
    }
    if (!message || message.length < 10) {
      setErrorMessage('Please add a bit more detail about your project.');
      setSubmitStatus('error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage('Email service is not configured. Please try again later.');
      setSubmitStatus('error');
      return;
    }

    // Pre-open WhatsApp window from the user gesture (avoids popup blockers).
    const whatsappNumber = '919584777747';
    let waWindow: Window | null = null;
    try {
      waWindow = window.open('about:blank', '_blank');
    } catch {
      waWindow = null;
    }

    setIsSubmitting(true);
    setSubmitStatus('sending');

    const submittedAt = formatDateTime(new Date());
    const safeMessageForUrl = message.length > 1000 ? `${message.slice(0, 1000)}…` : message;

    const whatsappText =
      `🚀 New Contact Inquiry – DeccaNoid\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Company: ${company || '—'}\n` +
      `Service: ${service}\n\n` +
      `Project Details:\n${safeMessageForUrl}\n\n` +
      `Submitted On: ${submittedAt}`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    const messageHtml =
      `<div style="font-family: Arial, sans-serif; line-height: 1.6;">` +
      `<h2 style="margin:0 0 12px;">New Contact Inquiry – DeccaNoid IT Solutions</h2>` +
      `<table style="width:100%; border-collapse:collapse;">` +
      `<tr><td style="padding:6px 0; width:180px;"><strong>Full Name</strong></td><td style="padding:6px 0;">${name}</td></tr>` +
      `<tr><td style="padding:6px 0;"><strong>Email Address</strong></td><td style="padding:6px 0;">${email}</td></tr>` +
      `<tr><td style="padding:6px 0;"><strong>Phone Number</strong></td><td style="padding:6px 0;">${phone}</td></tr>` +
      `<tr><td style="padding:6px 0;"><strong>Company Name</strong></td><td style="padding:6px 0;">${company || '—'}</td></tr>` +
      `<tr><td style="padding:6px 0;"><strong>Selected Service</strong></td><td style="padding:6px 0;">${service}</td></tr>` +
      `</table>` +
      `<h3 style="margin:16px 0 8px;">Project Details</h3>` +
      `<div style="white-space:pre-wrap;">${safeMessageForUrl}</div>` +
      `<p style="margin:16px 0 0;"><strong>Submitted On:</strong> ${submittedAt}</p>` +
      `</div>`;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          subject: 'New Contact Inquiry – DeccaNoid IT Solutions',
          to_email: 'deccanoid@gmail.com',
          from_name: name,
          from_email: email,
          phone,
          company: company || '—',
          service,
          project_details: message,
          submitted_at: submittedAt,
          message_html: messageHtml,
        },
        { publicKey }
      );

      setSubmitStatus('success');
      setSubmitted(true);

      // Trigger WhatsApp after successful email send.
      if (waWindow && !waWindow.closed) {
        try {
          waWindow.location.href = waUrl;
          waWindow.opener = null;
        } catch {
          // fallback
          window.open(waUrl, '_blank', 'noopener,noreferrer');
          try {
            waWindow.close();
          } catch {
            // no-op
          }
        }
      } else {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setSubmitStatus('idle');
        setErrorMessage(null);
      }, 3000);
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      if (waWindow && !waWindow.closed) {
        try {
          waWindow.close();
        } catch {
          // no-op
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'hello@deccanoid.com',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 9584777747',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Headquarters',
      value: 'Indore, MadhyaPradesh, India',
      gradient: 'from-green-600 to-teal-500'
    }
  ];

  return (
    <div className={`relative py-24 overflow-hidden transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-gradient-to-b from-gray-50 to-white'
        : 'bg-gradient-to-b from-[var(--theme-bg-primary)] to-[var(--theme-bg-secondary)]'
    }`}>
      <AnimatedBackgroundCanvas intensity="subtle" />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-2 rounded-full text-sm mb-4 ${
              theme === 'light'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-blue-900/40 text-blue-300'
            }`}
          >
            Get In Touch
          </motion.div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <span className="block">Let's Build</span>

            <span
              className="block"
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(90deg, #2563eb, #22d3ee)'
                  : 'none',
                backgroundClip: theme === 'light' ? 'text' : 'unset',
                WebkitBackgroundClip: theme === 'light' ? 'text' : 'unset',
                color: theme === 'light'
                  ? 'transparent'
                  : '#00dcff',
                WebkitTextFillColor: theme === 'light'
                  ? 'transparent'
                  : 'unset',
                paddingBottom: '0.20em'
              }}
            >
              Something Amazing
            </span>
          </h2>

          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Ready to transform your business? Our team of experts is here to help you
            achieve your digital goals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
              theme === 'light'
                ? 'bg-white border border-gray-100'
                : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
            }`}>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className={`text-2xl mb-2 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>Thank You!</h3>
                  <p className={`${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Full Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'name' ? 1.02 : 1,
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Email Address *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'email' ? 1.02 : 1,
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Phone Number *
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'phone' ? 1.02 : 1,
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                      placeholder="+91 9584777747"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Company Name
                    </label>
                    <motion.input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'company' ? 1.02 : 1,
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Service Interested In *
                    </label>
                    <motion.select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'service' ? 1.02 : 1,
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="development">Custom Development</option>
                      <option value="data">Data Engineering</option>
                      <option value="security">Cybersecurity</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="mobile">Mobile Solutions</option>
                      <option value="iot">IoT Solutions</option>
                      <option value="consulting">Digital Transformation</option>
                    </motion.select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={`block text-sm mb-2 ${
                      theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-secondary)]'
                    }`}>
                      Project Details *
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      animate={{
                        scale: focusedField === 'message' ? 1.02 : 1,
                      }}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                        theme === 'light'
                          ? 'border-gray-200 bg-white text-black'
                          : 'border-[var(--theme-border)] bg-[var(--theme-bg-primary)] text-white'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  {errorMessage && (
                    <div className={`text-sm ${
                      theme === 'light' ? 'text-red-600' : 'text-red-400'
                    }`}>
                      {errorMessage}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-75' : ''
                    }`}
                  >
                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className={`group rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white border border-gray-100'
                      : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <div className={`text-sm mb-1 ${
                        theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
                      }`}>{info.label}</div>
                      <div className={`text-lg ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>{info.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl mb-4">Why Choose DeccaNoid?</h3>
              <ul className="space-y-3">
                {[
                  '24/7 Global Support',
                  'Enterprise-Grade Security',
                  'Proven Track Record',
                  'Agile Methodology',
                  'Transparent Pricing'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.3 }}
              className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
                theme === 'light'
                  ? 'bg-white border border-gray-100'
                  : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
              }`}
            >
              <div className="text-4xl mb-2">⚡</div>
              <div className={`text-lg mb-1 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}>Lightning Fast Response</div>
              <div className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>We typically respond within 2-4 hours</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
