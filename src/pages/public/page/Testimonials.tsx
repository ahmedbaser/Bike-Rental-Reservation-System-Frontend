const Testimonials = () => {
    const reviews = [
        {
           id: 1, quote: "Great experience, highly recommend!", customer: "John Doe" 
        },
        {
           id: 2, quote: "Best bike rental service in town!", customer: "Jane Smith" 
        },
    ];

    return (
        <div className="py-10 bg-gray-100">
           <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2> 
           <div className="flex justify-center space-x-6">
            {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-white shadow-md rounded-lg max-w-md">
                    <p className="text-lg">"{review.quote}"</p>
                    <p className="mt-4 font-semibold">- {review.customer}</p>
                </div>
            ))}
           </div>
        </div>
    );
};

export default Testimonials;


