import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Download, Check } from 'lucide-react'
import Section from './common/Section'
import { profile } from '../data/profile'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => {
      setCopied(false)
      setShowToast(false)
    }, 2000)
  }

  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: profile.contact.phone,
      href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.contact.email,
      onClick: copyEmail,
      isCopyButton: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: profile.contact.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.contact.linkedin },
    { icon: Facebook, label: 'Facebook', href: profile.contact.facebook },
  ]

  return (
    <Section id="contact" backgroundColor="#F8FAFC" patternColor="#10B981" patternOpacity={0.04}>
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Get In Touch
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Currently open to new opportunities in Data Engineering
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom right, ${item.icon === Mail ? '#3B82F6' : item.icon === Phone ? '#10B981' : '#F97316'}20, transparent 70%)`,
                }}
              />
              <item.icon className="mx-auto mb-4 text-primary" size={32} strokeWidth={2} />
              <h3 className="font-bold text-gray-500 text-sm mb-2">{item.label}</h3>
              {item.isCopyButton ? (
                <>
                  <p className="text-primary font-medium text-sm mb-2 break-all">{item.value}</p>
                  <button
                    onClick={item.onClick}
                    className="w-full mt-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Mail size={16} /> Copy Email
                      </>
                    )}
                  </button>
                </>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-primary font-medium hover:text-secondary transition-colors break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-primary font-medium">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="font-bold text-primary mb-4">Connect With Me</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
              >
                <link.icon size={24} />
                <span className="hidden md:inline">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-primary border-2 border-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Download size={20} />
            Download Full CV (PDF)
          </a>
        </motion.div>

        {/* Toast notification */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
          >
            <Check size={18} />
            Đã sao chép email!
          </motion.div>
        )}
      </div>
    </Section>
  )
}
