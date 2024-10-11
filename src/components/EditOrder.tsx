import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';
import { motion } from 'framer-motion';
import { Edit, Trash2, Check, X } from 'lucide-react';

// Import API credentials from api.ts
import { API_URL, USERNAME, PASSWORD } from '../api';

const EditOrder: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      const data = [{
        "__id": orderId,
        "status": "Done"
      }];

      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD)
        },
        body: JSON.stringify(data),
      });

      if (response.status === 204) {
        setOrders(orders.map(order => 
          order.__id === orderId ? { ...order, status: 'Done' } : order
        ));
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const data = [{ "__id": orderId }];

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD)
        },
        body: JSON.stringify(data),
      });

      if (response.status === 204) {
        setOrders(orders.filter(order => order.__id !== orderId));
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading orders...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Orders</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <motion.tr
                key={order.__id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.__id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.details}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => updateOrderStatus(order.__id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    disabled={order.status === 'Done'}
                  >
                    {order.status === 'Done' ? <Check className="h-5 w-5 text-green-500" /> : <Edit className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => deleteOrder(order.__id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditOrder;