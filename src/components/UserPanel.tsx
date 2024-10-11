import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileNavbar from './MobileNavbar';
import { fetchOrders } from '../api';
import OrderList from './OrderList';
import { Package, CheckSquare, Calendar, Search, ArrowRight } from 'lucide-react';

const UserPanel: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  const pendingOrders = orders.filter((order) => order.status === 'Pending');
  const completedOrders = orders.filter((order) => order.status === 'Done');

  const filteredOrders = (orderList: any[]) => {
    return orderList.filter((order) =>
      order.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col">
        <MobileHeader toggleSidebar={toggleMobileSidebar} />
        <main className="flex-1 p-6 overflow-auto md:ml-20 lg:ml-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-3xl shadow-lg p-8 text-white cursor-pointer hover:shadow-2xl transition-all duration-300"
                      onClick={() => navigate('/user/pending')}
                    >
                      <Package className="w-16 h-16 mb-6 text-purple-100" />
                      <h2 className="text-3xl font-semibold mb-4">Pending Orders</h2>
                      <p className="text-5xl font-bold mb-4">{pendingOrders.length}</p>
                      <motion.div
                        className="flex items-center text-purple-100"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="mr-2">View all</span>
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl shadow-lg p-8 text-white cursor-pointer hover:shadow-2xl transition-all duration-300"
                      onClick={() => navigate('/user/completed')}
                    >
                      <CheckSquare className="w-16 h-16 mb-6 text-green-100" />
                      <h2 className="text-3xl font-semibold mb-4">Completed Orders</h2>
                      <p className="text-5xl font-bold mb-4">{completedOrders.length}</p>
                      <motion.div
                        className="flex items-center text-green-100"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="mr-2">View all</span>
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-gradient-to-br from-yellow-400 to-orange-600 rounded-3xl shadow-lg p-8 text-white cursor-pointer hover:shadow-2xl transition-all duration-300"
                    >
                      <Calendar className="w-16 h-16 mb-6 text-yellow-100" />
                      <h2 className="text-3xl font-semibold mb-4">Today's Date</h2>
                      <p className="text-2xl font-bold mb-4">{new Date().toLocaleDateString()}</p>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12"
                  >
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="flex items-center mb-6">
                        <Search className="text-gray-400 mr-3" size={24} />
                        <input
                          type="text"
                          placeholder="Search orders..."
                          className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <OrderList orders={filteredOrders(orders.slice(0, 5))} />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            } />
            <Route path="/pending" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Pending Orders</h1>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <Search className="text-gray-400 mr-3" size={24} />
                    <input
                      type="text"
                      placeholder="Search pending orders..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <OrderList orders={filteredOrders(pendingOrders)} />
                </div>
              </motion.div>
            } />
            <Route path="/completed" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Completed Orders</h1>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center mb-6">
                    <Search className="text-gray-400 mr-3" size={24} />
                    <input
                      type="text"
                      placeholder="Search completed orders..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <OrderList orders={filteredOrders(completedOrders)} />
                </div>
              </motion.div>
            } />
          </Routes>
        </main>
        <MobileNavbar role="user" />
      </div>
    </div>
  );
};

export default UserPanel;