import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message } from 'antd';
import { deleteUser, fetchUsers, promoteToAdmin } from '../../redux/store/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { ColumnsType } from 'antd/es/table';

const UserManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading } = useSelector((state: any) => state.user);  

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
      .then(() => {
        message.success('User deleted successfully');
      })
      .catch(() => {
        message.error('Failed to delete user');
      });
  };

  const handlePromote = (id: string) => {
    dispatch(promoteToAdmin(id))
      .then(() => {
        message.success('User promoted to admin successfully');
      })
      .catch(() => {
        message.error('Failed to promote user');
      });
  };

  // Define columns
  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md', 'lg'], // Display on all devices
      ellipsis: true, 
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true, 
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['xs', 'sm', 'md', 'lg'], 
      ellipsis: true, 
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true, 
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (role === 'admin' ? 'Admin' : 'User'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          {record.role !== 'admin' && (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger className="w-full sm:w-auto">
                Delete
              </Button>
            </Popconfirm>
          )}
          {record.role !== 'admin' && (
            <Button type="primary" onClick={() => handlePromote(record._id)} className="w-full sm:w-auto">
              Promote to Admin
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl md:text-2xl mb-4 text-center md:text-left">User Management</h1>
      {/* Scrollable table for smaller devices */}
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="_id" 
        loading={loading} 
        scroll={{ x: 1000 }}  
        pagination={{ pageSize: 10 }}  
      />
    </div>
  );
};

export default UserManagement;
