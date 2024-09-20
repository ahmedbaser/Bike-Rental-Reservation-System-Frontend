const ContactUs = () => {
   return (
     <div className="mb-8">
        <h2 className="text-2xl text-center font-bold mt-5 mb-8">Contact Us</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="border p-2 w-full rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="border p-2 w-full rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea className="border p-2 w-full rounded-md"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
  );
};

export default ContactUs;





    
