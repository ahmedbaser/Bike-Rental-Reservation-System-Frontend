import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-6">
        Your privacy is important to us. This privacy policy explains the types of personal data we collect and how we use it.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>Information you provide when you sign up, such as name, email, and address.</li>
        <li>Automatically collected information, such as IP address and browser type.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>To provide and improve our services.</li>
        <li>To send you promotional information or updates about our services.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Third-Party Sharing</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>We do not share your personal information with third parties, except as necessary to provide our services or comply with legal obligations.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>You have the right to access, update, or delete your personal information at any time.</li>
        <li>Contact us at <a href="mailto:support@bikerentalsystem.com" className="text-blue-600">support@bikerentalsystem.com</a> for more information.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
