"use client"

import React, { useState, useEffect } from 'react'
import { fetchOrders } from '../api'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, Check, X, RefreshCw } from 'lucide-react'

// Import API credentials from api.ts
import { API_URL, USERNAME, PASSWORD } from '../api'

export default function EditOrder() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const fetchedOrders = await fetchOrders()
      setOrders(fetchedOrders)
      setLoading(false)
    } catch (err) {
      setError('Failed to load orders')
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string) => {
    try {
      const data = [{
        "__id": orderId,
        "status": "Done"
      }]

      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD)
        },
        body: JSON.stringify(data),
      })

      if (response.status === 204) {
        setOrders(orders.map(order => 
          order.__id === orderId ? { ...order, status: 'Done' } : order
        ))
      } else {
        throw new Error('Failed to update order status')
      }
    } catch (err) {
      setError('Failed to update order status')
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      const data = [{ "__id": orderId }]

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(USERNAME + ":" + PASSWORD)
        },
        body: JSON.stringify(data),
      })

      if (response.status === 204) {
        setOrders(orders.filter(order => order.__id !== orderId))
      } else {
        throw new Error('Failed to delete order')
      }
    } catch (err) {
      setError('Failed to delete order')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Orders</h1>
        </div>
        <div className="p-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadOrders}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Orders
          </motion.button>
          {loading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-8 w-8 text-indigo-600 mx-auto" />
              </motion.div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <X className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-4 text-red-500">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                  <AnimatePresence>
                    {orders.map((order) => (
                      <motion.tr
                        key={order.__id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.__id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.details}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateOrderStatus(order.__id)}
                            className={`mr-4 p-2 rounded-full ${
                              order.status === 'Done'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                            }`}
                            disabled={order.status === 'Done'}
                          >
                            {order.status === 'Done' ? <Check className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteOrder(order.__id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
