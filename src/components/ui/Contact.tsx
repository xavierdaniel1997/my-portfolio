"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // EmailJS configuration from environment variables
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Daniel Xavier',
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
            );

            console.log('Email sent successfully:', result);
            setStatus('success');

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setStatus('idle');
            }, 3000);

        } catch (error) {
            console.error('Email sending failed:', error);
            setStatus('error');

            // Reset error status after 3 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Section id="contact" className="items-center">
            <div className="w-full max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 md:mb-8"
                >
                    LET'S TALK
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl text-secondary mb-8 md:mb-12 px-4"
                >
                    Have a project in mind? Let's build something extraordinary together.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-md mx-auto space-y-4 sm:space-y-6 px-4"
                    onSubmit={handleSubmit}
                >
                    <div className="relative group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            disabled={status === 'sending'}
                            className="w-full bg-glass border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            disabled={status === 'sending'}
                            className="w-full bg-glass border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="relative group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            rows={4}
                            required
                            disabled={status === 'sending'}
                            className="w-full bg-glass border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending' || status === 'success'}
                        className="w-full bg-white text-black font-bold py-3 sm:py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                        {status === 'idle' && (
                            <>
                                <span>Send Message</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                        {status === 'sending' && (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                />
                                <span>Sending...</span>
                            </>
                        )}
                        {status === 'success' && (
                            <>
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="text-green-600">Message Sent!</span>
                            </>
                        )}
                        {status === 'error' && (
                            <>
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <span className="text-red-600">Failed. Try Again</span>
                            </>
                        )}
                    </button>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-green-400 text-center"
                        >
                            Thanks! I'll get back to you soon.
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-400 text-center"
                        >
                            Something went wrong. Please try again or email me directly.
                        </motion.p>
                    )}
                </motion.form>
            </div>
        </Section>
    );
};

export default Contact;
