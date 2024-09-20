import { Button, Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBikes } from "../../redux/store/actions/bikeActions";

const BikeListingPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const bikes = useSelector((state: RootState) => state.bike.bikes);

  const [brandFilter, setBrandFilter] = useState<string>('');
  const [modelFilter, setModelFilter] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Bikes in Redux store after filter:", bikes);
  }, [bikes]);

  const filteredBikes = bikes.filter((bike) => {
    const matchesBrand = brandFilter ? bike.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true;
    const matchesModel = modelFilter ? bike.model.toLowerCase().includes(modelFilter.toLowerCase()) : true;
    const matchesAvailability =
      availabilityFilter === ''
        ? true
        : availabilityFilter === 'available'
        ? bike.isAvailable === true
        : availabilityFilter === 'notAvailable'
        ? bike.isAvailable === false
        : true;

    return matchesBrand && matchesModel && matchesAvailability;
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl md:text-2xl mb-4 text-center md:text-left">Available Bikes</h2>
      <div className="flex space-x-4 mb-6">
        <Input
          placeholder="Filter by Brand"
          value={brandFilter}
          className="w-1/2"
          onChange={(e) => setBrandFilter(e.target.value)}
        />
        <Input
          placeholder="Filter by Model"
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="w-1/2"
        />
        <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="border p-2">
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="notAvailable">Not Available</option>
        </select>
        <Button onClick={filteredBikes} type="primary">
          Apply Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBikes.map((bike) => (
          <Card key={bike._id}>
            <p>Brand: {bike.brand}</p>
            <p>Model: {bike.model}</p>
            <p>Availability: {bike.isAvailable ? 'Available' : 'Not Available at the moment'}</p>
            <Link to={`/bike-management/${bike._id}`}>
              <Button type="primary">View Details</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BikeListingPage;






