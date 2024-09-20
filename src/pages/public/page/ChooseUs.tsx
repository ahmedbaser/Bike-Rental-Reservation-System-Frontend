const ChooseUs = () => {
    const benefits = [
        {id: 1, title:"Best Prices", description: "Affordable rental rates on all bikes."},
        {id: 2, title:"Wide Selection", description: "A wide range of bikes to suit your needs.."},
        {id: 3, title:"Excellent Service", description: "Top-notch customer service for a seamless experience."},
  ];

  return (
    <div className="py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-7">
          {benefits.map((benefit) => (
           <div key={benefit.id} className="pt-6 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl">{benefit.title}</h3>
            <p className="p-4">{benefit.description}</p>
           </div>
          ))}
        </div>
    </div>
  );

};

export default ChooseUs;