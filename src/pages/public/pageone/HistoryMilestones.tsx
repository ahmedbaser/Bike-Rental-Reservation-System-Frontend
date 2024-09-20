const HistoryMilestones = () => {
    const milestones = [
        { year: "2015", event: "Company Founded", text:"Founded Bike Rental with a mission to offer affordable and reliable bikes for rent." },
        { year: "2018", event: "First 100 Bikes Rented", text:"Expanded to 50+ locations across the country." },
        { year: "2020", event: "Expanded to 5 Cities", text:"Launched our mobile app for easy booking and management of bike rentals." },
        { year: "2023", event: "Launched Mobile App", text:"Reached 1 million satisfied customers and counting." },
    ];

    return (
        <div className="py-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6">Our Journey</h2>
            <div className="max-w-2xl mx-auto">
                {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center mb-1">
                       <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full">{milestone.year}</div> 
                       <div className="ml-4">
                        <p className="text-lg font-semibold mt-2">{milestone.event}</p>
                        <p className="text-1xl">{milestone.text}</p>
                      </div> 
                    </div>
                ))}
            </div>
        </div>

    );

};

export default HistoryMilestones;