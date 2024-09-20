import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Input, Popconfirm, message, Select, InputNumber } from 'antd';
import { AppDispatch, RootState } from '../../redux/store/index';
import BikeFormModal from './BikeFormModal';
import { deleteBike, fetchBikes } from '../../redux/store/actions/bikeActions';
import { useMediaQuery } from 'react-responsive';

const { Option } = Select;

const BikeListingPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const bikes = useSelector((state: RootState) => state.bike.bikes);

  const [searchText, setSearchText] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  
  const handleCreateBike = () => {
    setIsModalVisible(true);
  };




  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBrandChange = (value: string | null) => {
    setSelectedBrand(value);
  };

  const handleModelChange = (value: string | null) => {
    setSelectedModel(value);
  };

  const handleAvailabilityChange = (value: boolean | null) => {
    setSelectedAvailability(value !== undefined ? value : null);
  };

  const handleMinPriceChange = (value: number | null) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: number | null) => {
    setMaxPrice(value);
  };

  const handleEdit = (bike: any) => {
    setSelectedBike(bike);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBike(id))
      .then(() => message.success('Bike deleted successfully'))
      .catch(() => message.error('Failed to delete bike'));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBike(null);
  };

  // Filtered bikes logic
  const filteredBikes = bikes
    .filter((bike: any) => bike?.name?.toLowerCase().includes(searchText.toLowerCase()))
    .filter((bike: any) => selectedBrand ? bike.brand === selectedBrand : true)
    .filter((bike: any) => selectedModel ? bike.model === selectedModel : true)
    .filter((bike: any) => selectedAvailability !== null ? bike.isAvailable === selectedAvailability : true)
    .filter((bike: any) => minPrice !== null ? bike.pricePerHour >= minPrice : true)
    .filter((bike: any) => maxPrice !== null ? bike.pricePerHour <= maxPrice : true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      render: (pricePerHour: number) => `$${pricePerHour}`,
    },
    {
      title: 'CC',
      dataIndex: 'cc',
      key: 'cc',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Availability',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (isAvailable: boolean) => (isAvailable ? 'Available' : 'Not Available'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={() => handleEdit(record)} type="primary" className="mr-2">Edit</Button>
          <Button type="primary" className="mr-2" onClick={handleCreateBike}>Create Bike</Button>
          <Popconfirm
            title="Are you sure to delete this bike?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" className="mr-2 bg-red-400 text-white hover:bg-red-300">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const uniqueBrands = Array.from(new Set(bikes.map((bike: any) => bike.brand)));
  const uniqueModels = Array.from(new Set(bikes.map((bike: any) => bike.model)));
  const uniqueAvailability = [true, false];

  return (
    <div className="container mx-auto p-6">
      <div className={`mb-4 flex ${isTablet ? 'flex-col space-y-4' : 'flex-wrap space-y-0 justify-between'}`}>
        <Input
          placeholder="Search bikes"
          value={searchText}
          onChange={handleSearch}
          className="w-full sm:w-[19%]"
        />
        <Select
          placeholder="Filter by brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          allowClear
          className="w-full sm:w-[16%]"
        >
          {uniqueBrands.map((brand) => (
            <Option key={brand} value={brand}>{brand}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by model"
          value={selectedModel}
          onChange={handleModelChange}
          allowClear
          className="w-full sm:w-[16%]"
        >
          {uniqueModels.map((model) => (
            <Option key={model} value={model}>{model}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by availability"
          value={selectedAvailability}
          onChange={handleAvailabilityChange}
          allowClear
          className="w-full sm:w-[16%]"
        >
          {uniqueAvailability.map((isAvailable) => (
            <Option key={isAvailable.toString()} value={isAvailable}>{isAvailable ? 'Available' : 'Not Available'}</Option>
          ))}
        </Select>
        <InputNumber
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full sm:w-[16%]"
        />
        <InputNumber
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full sm:w-[16%]"
        />
      </div>
      <BikeFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        bike={selectedBike}
      />
      <Table
        columns={columns}
        dataSource={filteredBikes}
        rowKey="_id"
        scroll={{ x: 800 }}
        bordered
        pagination={{ pageSize: 8 }}
       
      />
    </div>
  );
};

export default BikeListingPage;


















