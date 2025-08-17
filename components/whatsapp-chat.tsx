"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, Clock, MapPin } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+447123456789"; // Replace with actual WhatsApp number
    const message =
      "Hi! I'm interested in learning more about your AI and data science services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@dataconsulting-group.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+447123456789";
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 max-w-sm"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-primary text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">DCG Support</h3>
                      <p className="text-sm text-primary-foreground/80">
                        We're here to help!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Welcome Message */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    👋 Hi! Need help with AI consulting, data science, or have a
                    project in mind? We're here to help you transform your
                    business!
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <motion.button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </motion.button>

                  <motion.button
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    onClick={handleEmailClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </motion.button>

                  <motion.button
                    className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    onClick={handlePhoneClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Us</span>
                  </motion.button>
                </div>

                {/* Expandable Info */}
                <div className="border-t pt-3">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full text-left text-sm text-gray-600 hover:text-primary transition-colors flex items-center justify-between"
                  >
                    <span>Business Hours & Info</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="mt-3 space-y-2 text-xs text-gray-600"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>Mon-Fri: 9AM-6PM GMT</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>Saturday: 10AM-4PM GMT</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>London, UK (HQ)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>Global Team Available</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services Preview */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                  <h4 className="font-semibold text-sm text-primary mb-2">
                    Our Services:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "AI Consulting",
                      "ML Models",
                      "Data Analytics",
                      "Cloud Migration",
                      "Security",
                    ].map((service) => (
                      <span
                        key={service}
                        className="inline-block px-2 py-1 text-xs bg-white/80 text-primary rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
