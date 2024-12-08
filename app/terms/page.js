import React from "react";

const Terms = () => {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center ">
      <div className="max-w-3xl w-[85%]  sm:w-[50%]  h-[90vh] overflow-y-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to DevSponsor! These Terms and Conditions govern your use of the platform. By accessing or using the platform, you agree to comply with and be bound by these terms. If you do not agree to these terms, please do not use the platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
        <ul className="list-disc pl-6 mb-6 text-black">
          <li><strong>Platform:</strong> Refers to the DevSponsor website and its services.</li>
          <li><strong>User:</strong> Refers to individuals or entities accessing the platform.</li>
          <li><strong>Sponsor:</strong> Refers to users funding projects or developers.</li>
          <li><strong>Developer:</strong> Refers to users creating and managing projects.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
        <p className="text-lg text-gray-700 mb-6">
          Users are responsible for providing accurate information and ensuring their use of the platform is lawful. Any illegal activities may result in the termination of your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
        <p className="text-lg text-gray-700 mb-6">
          All payments made on the platform are processed via secure third-party gateways. DevSponsor is not responsible for disputes arising between sponsors and developers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
        <p className="text-lg text-gray-700 mb-6">
          Users retain ownership of their content but grant DevSponsor a non-exclusive license to use and display content on the platform for its operation.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
        <p className="text-lg text-gray-700 mb-6">
          DevSponsor reserves the right to suspend or terminate any user account if these terms are violated. Users may also terminate their account at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
        <p className="text-lg text-gray-700 mb-6">
          DevSponsor reserves the right to modify these terms at any time. It is the responsibility of the user to review these terms periodically.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions about these Terms and Conditions, please contact us at support@devsponsor.com.
        </p>
      </div>
    </div>
  );
};

export default Terms;
