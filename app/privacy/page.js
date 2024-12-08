import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="max-w-3xl w-[85%] sm:w-[50%] h-[90vh] overflow-y-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-6">
          DevSponsor respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
        <p className="text-lg text-gray-700 mb-6">
          We collect personal information such as your name, email address, payment information, and any content you upload while using the platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
        <p className="text-lg text-gray-700 mb-6">
          The information we collect is used to provide and improve our services, process payments, communicate with you, and ensure a secure user experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sharing Your Information</h2>
        <p className="text-lg text-gray-700 mb-6">
          We do not sell your personal information to third parties. However, we may share your data with trusted partners who help us run the platform or for legal reasons.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
        <p className="text-lg text-gray-700 mb-6">
          We implement security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is completely secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
        <p className="text-lg text-gray-700 mb-6">
          You have the right to access, correct, or delete your personal information. You can contact us at any time to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-6">
          We may update this Privacy Policy periodically. We will notify you of any significant changes.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions about this Privacy Policy, please reach out to us at privacy@devsponsor.com.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
