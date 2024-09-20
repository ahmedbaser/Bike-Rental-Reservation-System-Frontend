import { useState } from 'react';
import { Input, message, Button } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

const { Search } = Input;

const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  const [bikes, setBikes] = useState<any[]>([]); 
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (value: string) => {
    if (!value) {
      message.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/bikes/search?q=${value}`);
      if (response.data.success) {
        if (response.data.bikes.length === 0) {
          message.info('Bike Not Found');
        } else {
          setBikes(response.data.bikes);
          message.success('Bikes found!');
        }
        setHasSearched(true);
      } else {
        message.error('No bikes found');
      }
    } catch (error) {
      message.error('Error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const onClearSearch = () => {
    setBikes([]);
    setHasSearched(false);
    message.info('Search cleared');
  };

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://bd.gaadicdn.com/processedimages/suzuki/2019-gixxer/494X300/2019-gixxer63e5f65b5d876.jpg?imwidth=412&impolicy=resize')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Rent Your Dream Bike Today!</h1>
        <p className="text-xl mb-6">Explore the best bikes at unbeatable prices.</p>
        <Search
          placeholder="Search for bike availability"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          loading={loading}
          style={{ maxWidth: '300px' }}
        />

        {hasSearched && (
          <Button
            type="default"
            danger
            onClick={onClearSearch}
            className="mt-4"
          >
            Clear Results
          </Button>
        )}

        <div className="mt-6">
          {bikes.length > 0 ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Available Bikes:</h3>
              <ul className="space-y-4">
                {bikes.map(bike => (
                  <li key={bike._id} className="bg-white text-black p-4 rounded-md shadow-md">
                    <h4 className="text-lg font-semibold">{bike.name}</h4>
                    <p><strong>Brand:</strong> {bike.brand}</p>
                    <p><strong>Model:</strong> {bike.model}</p>
                    <p><strong>CC:</strong> {bike.cc}</p>
                    <p><strong>Year:</strong> {bike.year}</p>
                    <p><strong>Description:</strong> {bike.description}</p>
                    <p><strong>Price Per Hour:</strong> ${bike.pricePerHour}</p>
                    <p><strong>Available:</strong> {bike.isAvailable ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            hasSearched && <p className="text-lg">Bike Not Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
