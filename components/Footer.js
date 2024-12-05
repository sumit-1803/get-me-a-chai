import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Using React icons for social media links

const Footer = () => {
  return (
    <footer className="relative bg-[#3730a3] text-white py-8 shadow-lg">
      {/* Adding a blur effect with a gradient */}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-t from-indigo-900 to-transparent h-24 blur-sm"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="flex justify-center gap-6 mb-4">
          {/* Social Media Icons */}
          <a href="github.com/sumit-1803" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} className="hover:text-gray-300 transition-colors" />
          </a>
          <a href="https://x.com/sumit182003" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="hover:text-gray-300 transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/sumit1803/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} className="hover:text-gray-300 transition-colors" />
          </a>
        </div>
        
        <p className="text-center text-sm md:text-base mb-2">
          &copy; {new Date().getFullYear()} Get M3 a Chai - All Rights Reserved
        </p>
        
        <div className="flex gap-4">
          <a href="/terms" className="text-sm hover:underline">Terms of Service</a>
          <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
          <a href="/contact" className="text-sm hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
