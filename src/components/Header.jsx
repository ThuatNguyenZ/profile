import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import SocialLink from './common/SocialLink'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100)
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textColor = isAtTop ? 'text-white' : 'text-gray-800'

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      } ${isAtTop ? 'border-b border-white/10' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-xl font-bold ${textColor} cursor-pointer`}
            onClick={() => scrollToSection('home')}
          >
            NTT<span className="text-secondary">.</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${textColor} hover:text-secondary transition-colors font-medium`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="" color={textColor} />
            <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="" color={textColor} />
            <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="" color={textColor} />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t pt-4"
              >
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left ${textColor} hover:text-secondary font-medium py-2`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex gap-4 pt-4 border-t">
                    <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="GitHub" color={textColor} />
                    <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="LinkedIn" color={textColor} />
                    <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="Email" color={textColor} />
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
