import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-lg mb-4">
        Welcome to our website. These terms and conditions outline the rules and regulations for the use of our services.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Usage of Our Services</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>By accessing or using our services, you agree to comply with and be bound by these terms.</li>
        <li>You may not use our services for any unlawful purpose.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>All content on this website, including text, graphics, logos, and images, is the property of our company.</li>
        <li>Content is protected by intellectual property laws.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">Termination of Use</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>We may terminate or suspend your access to our services immediately without prior notice if you violate these terms.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
      <ul className="list-disc list-inside mb-6 pl-5">
        <li>We reserve the right to modify these terms at any time.</li>
        <li>It is your responsibility to review these terms periodically for changes.</li>
      </ul>
    </div>
  );
};

export default TermsOfService;
