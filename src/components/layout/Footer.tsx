import Link from 'next/link'
import { Cpu, Github, Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-dark-800" role="contentinfo">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold text-xl mb-4"
              aria-label="Emmanuel Inambao - Home"
            >
              <Cpu className="w-6 h-6 text-primary-500" aria-hidden="true" />
              Emmanuel Inambao
            </Link>
            <p className="text-dark-400 max-w-md mb-6">
              Electronic Engineer specializing in IoT, Robotics, and Full-Stack Systems. 
              Building intelligent solutions that bridge hardware and software to solve 
              real-world challenges across Africa and beyond.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/bolo3574"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/emmanuelinambao"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:denuelinambao@gmail.com"
                className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200"
                aria-label="Email Emmanuel"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/260973914432"
                className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200"
                aria-label="WhatsApp Emmanuel"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="text-dark-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-white font-semibold mb-4">Expertise</h3>
            <ul className="space-y-2">
              {[
                'Embedded Systems',
                'IoT Development',
                'Robotics',
                'Industrial Automation',
                'Full-Stack Development',
              ].map((skill) => (
                <li key={skill} className="text-dark-400">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm text-center sm:text-left">
              © {currentYear} Prof. Emmanuel Inambao. Engineering Excellence.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="text-dark-600 hover:text-dark-400 text-sm transition-colors"
              >
                Admin
              </Link>
              <p className="text-dark-600 text-sm">
                Designed & Built with precision in Lusaka, Zambia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
