import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Avatar from '../../components/common/Avatar';

const Contact = ({ onPageLoad }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    prompt: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [avatarMessage, setAvatarMessage] = useState(null);
  const form = useRef();

  useEffect(() => {
    if (onPageLoad) onPageLoad();
  }, [onPageLoad]);

  const promptOptions = [
    { value: '', label: 'Choose a conversation starter...' },
    { value: 'shaayari', label: 'Write me a one-line shaayari 📝' },
    { value: 'anime', label: 'Tell me what anime we\'d binge 🎌' },
    { value: 'tech', label: 'Let\'s talk about your favorite tech stack 💻' },
    { value: 'gym', label: 'Share your workout routine 💪' },
    { value: 'collaboration', label: 'I want to collaborate on a project 🤝' },
    { value: 'just-chat', label: 'Just want to say hi! 👋' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'prompt' && value) {
      const reactions = {
        shaayari: "Poetry mode activated! My heart is ready... 💕",
        anime: "Ooh, anime discussion incoming! I'm so excited! 🎉",
        tech: "Tech talk? Now you're speaking my language! 🤓",
        gym: "Fitness buddies? Let's get swole together! 💪",
        collaboration: "Partnership potential detected! 🚀",
        'just-chat': "Social.exe is running perfectly! 😊"
      };
      
      setAvatarMessage(reactions[value]);
      setTimeout(() => setAvatarMessage(null), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const messageWithPrompt = formData.prompt 
      ? `[${promptOptions.find(p => p.value === formData.prompt)?.label}]\n\n${formData.message}`
      : formData.message;

    const emailData = {
      ...formData,
      message: messageWithPrompt,
      to_name: 'Archisman',
      from_name: formData.name,
      reply_to: formData.email
    };

    try {
      // Replace with your EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailData,
        'YOUR_PUBLIC_KEY'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', prompt: '' });
      
      setAvatarMessage("Letter sent 💌");
      setTimeout(() => {
        setAvatarMessage("I'll get back to you soon! 😊");
        setTimeout(() => setAvatarMessage(null), 3000);
      }, 2000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      setAvatarMessage("Oops! Message.send() failed 😅");
      setTimeout(() => setAvatarMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSampleMessage = (prompt) => {
    const samples = {
      shaayari: "तेरे इश्क़ में डूबा है यह developer का दिल... 💕",
      anime: "I think we'd binge Attack on Titan together - perfect mix of action and emotion!",
      tech: "Your NestJS and AWS combo is impressive! Let's discuss microservices.",
      gym: "Your gym routine inspires me! What's your favorite compound movement?",
      collaboration: "I have a project idea that could use your expertise. Interested?",
      'just-chat': "Hey! Your portfolio is amazing. Just wanted to connect! 😊"
    };
    return samples[prompt] || '';
  };

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Let's Connect</h1>
          <div className="w-32 h-1 bg-gradient-accent mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-softText/90 max-w-2xl mx-auto">
            Drop me a message! Whether it's about code, anime, gym routines, or just life - I'm all ears 👂💕
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="soft-card border border-primary/30 shadow-glow-primary"
        >
          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-highlight text-sm font-bold mb-2 font-heading">
                  Your Name *
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="What should I call you?"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="block text-highlight text-sm font-bold mb-2 font-heading">
                  Email Address *
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>

            {/* Conversation Starter Dropdown */}
            <div>
              <label className="block text-highlight text-sm font-bold mb-2 font-heading">
                Conversation Starter 🎯
              </label>
              <motion.select
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                className="input-field"
                whileFocus={{ scale: 1.02 }}
              >
                {promptOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-subtleGray">
                    {option.label}
                  </option>
                ))}
              </motion.select>
              
              {/* Sample Message Hint */}
              {formData.prompt && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <p className="text-highlight text-sm font-medium mb-1">💡 Sample message:</p>
                  <p className="text-softText/80 text-sm italic">"{getSampleMessage(formData.prompt)}"</p>
                </motion.div>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-highlight text-sm font-bold mb-2 font-heading">
                Your Message *
              </label>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="input-field resize-none"
                placeholder={
                  formData.prompt 
                    ? getSampleMessage(formData.prompt)
                    : "Write your message here... Don't be shy! 😊"
                }
                whileFocus={{ scale: 1.01 }}
              />
              <div className="text-right mt-2">
                <span className="text-softText/50 text-xs">
                  {formData.message.length}/1000 characters
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-heading ${
                isSubmitting 
                  ? 'bg-subtleGray cursor-not-allowed text-softText/50' 
                  : 'btn-primary'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-softText mr-3"></div>
                  Sending Message...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  Send Message
                  <span className="ml-2 text-xl">🚀</span>
                </span>
              )}
            </motion.button>
          </form>

          {/* Submit Status */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-6 p-6 rounded-xl text-center ${
                  submitStatus === 'success' 
                    ? 'bg-primary/20 border border-highlight/30' 
                    : 'bg-subtleGray border border-subtleGray'
                }`}
              >
                {submitStatus === 'success' ? (
                  <div>
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="text-2xl font-heading font-bold text-accent mb-2">Message Sent Successfully!</h3>
                    <p className="text-highlight">
                      Thanks for reaching out! I'll get back to you within 24 hours. 😊
                    </p>
                    <p className="text-softText/70 text-sm mt-2 italic font-poetry">
                      "Great messages deserve great responses!" - Developer's Promise
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-3">❌</div>
                    <h3 className="text-2xl font-heading font-bold text-softText mb-2">Oops! Something went wrong</h3>
                    <p className="text-softText/80 mb-3">
                      The message couldn't be sent. Please try again or reach out via social media.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { 
              icon: '📧', 
              title: 'Email', 
              value: 'hello@archismansaha.dev',
              desc: 'For professional inquiries'
            },
            { 
              icon: '📱', 
              title: 'Social', 
              value: '@archismansaha',
              desc: 'Instagram, LinkedIn & more'
            },
            { 
              icon: '🌍', 
              title: 'Location', 
              value: 'Kolkata, India',
              desc: 'Available for remote work'
            }
          ].map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="card-interactive text-center border border-highlight/20"
            >
              <div className="text-4xl mb-3">{contact.icon}</div>
              <h3 className="text-lg font-heading font-bold text-accent mb-2">{contact.title}</h3>
              <p className="text-highlight font-medium mb-1">{contact.value}</p>
              <p className="text-softText/70 text-sm">{contact.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="soft-card border border-accent/20 shadow-soft">
            <blockquote className="text-xl md:text-2xl text-softText italic font-poetry mb-4 leading-relaxed">
              "हर message एक नई शुरुआत है,<br />
              हर conversation एक नया रिश्ता है।"
            </blockquote>
            <div className="text-accent font-bold">— Let's start our story! 💫</div>
          </div>
        </motion.div>
      </div>

      <Avatar
        currentLevel={25}
        currentXP={2500}
        visitedPages={['contact']}
        mood="helpful"
        messages={avatarMessage ? [avatarMessage] : [
          "Ready to receive your message! 📨",
          "I love connecting with new people! 😊",
          "Your message will reach me instantly! ⚡",
          "Don't be shy, say hello! 👋"
        ]}
      />
    </div>
  );
};

export default Contact;
