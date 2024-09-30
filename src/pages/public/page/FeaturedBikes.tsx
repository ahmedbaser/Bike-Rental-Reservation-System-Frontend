import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/reset.css';

interface Bike {
  _id: string;
  name: string;
  brand: string;
  image?: string;
  description?: string;
  pricePerHour?: number;
}

const FeaturedSection = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes');
        console.log('API Response:', response.data);

        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setBikes(response.data.data.slice(0, 3)); // Get the first 3 bikes
        } else {
          setError('Unexpected response format');
        }
      } catch (error: any) {
        console.error('Error fetching bikes', error.message || error);
        // setError(`Error fetching bikes: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Bikes</h2>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 justify-center">
        {bikes.map((bike) => (
          <div key={bike._id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <img
              src={bike.image || 'https://via.placeholder.com/150'}
              alt={bike.name}
              className="w-full h-48 object-cover rounded-md mb-4 transition duration-300 hover:scale-105"
            />
            <h3 className="text-xl font-semibold mb-2">{bike.name}</h3>
            <p className="text-gray-600 mb-2">Brand: {bike.brand}</p>
            <p className="text-gray-600 mb-4">Price per Hour: ${bike.pricePerHour}</p>
            <Button type="primary" href={`/bikes/${bike._id}`} size="large">
              View Detail
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
