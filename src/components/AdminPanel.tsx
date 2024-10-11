import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileNavbar from './MobileNavbar';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import EditOrder from './EditOrder';
import { fetchOrders } from '../api';

const AdminPanel: React.FC = () => {
  const [orders, setOrders] = React.useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  React.useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f0f8ff]">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col">
        <MobileHeader toggleSidebar={toggleMobileSidebar} />
        <main className="flex-1 p-6 overflow-auto md:ml-20 lg:ml-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={<OrderForm />} />
            <Route path="/orders" element={<OrderList orders={orders} />} />
            <Route path="/edit-orders" element={<EditOrder />} />
          </Routes>
        </main>
        <MobileNavbar role="admin" />
      </div>
    </div>
  );
};

export default AdminPanel;