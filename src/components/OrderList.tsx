"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Package, User, Palette, Ruler, Hash, Download } from 'lucide-react'

interface Order {
  id: string
  status: string
  orderstatus: string
  courier: string
  shipstatus: string
  name: string
  details: string
  colour: string
  size: string
  qty: number
  image: string
  downloaddesign?: string
}

interface OrderListProps {
  orders: Order[]
}

export default function Component({ orders }: OrderListProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500 text-white'
      case 'processing':
        return 'bg-blue-500 text-white'
      case 'shipped':
        return 'bg-green-500 text-white'
      case 'delivered':
        return 'bg-purple-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-24">
      {orders.map((order, index) => (
        <motion.div
          key={order.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="relative h-48">
            <img
              src={order.image || '/placeholder.svg?height=160&width=320'}
              alt={order.details}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 left-2 flex justify-between">
              <span
                className={`${getStatusColor(order.orderstatus)} rounded-full px-3 py-1 text-xs font-bold shadow-md`}
              >
                {order.orderstatus}
              </span>
              <span
                className={`${getStatusColor(order.status)} rounded-full px-3 py-1 text-xs font-bold shadow-md`}
              >
                {order.status}
              </span>
            </div>
            {order.downloaddesign && (
              <motion.a
                href={order.downloaddesign}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-2" size={16} />
                Download Design
              </motion.a>
            )}
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                {order.details}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <User className="mr-2 flex-shrink-0 text-indigo-600" size={16} />
                  <span className="font-medium mr-1">Customer:</span>
                  <span className="truncate">{order.name}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Palette className="mr-2 flex-shrink-0 text-indigo-600" size={16} />
                  <span className="font-medium mr-1">Colour:</span>
                  <span>{order.colour}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Ruler className="mr-2 flex-shrink-0 text-indigo-600" size={16} />
                  <span className="font-medium mr-1">Size:</span>
                  <span>{order.size}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Hash className="mr-2 flex-shrink-0 text-indigo-600" size={16} />
                  <span className="font-medium mr-1">Qty:</span>
                  <span>{order.qty}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
