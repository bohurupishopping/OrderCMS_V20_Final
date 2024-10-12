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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 md:p-8 pb-24">
      {orders.map((order, index) => (
        <motion.div
          key={order.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 flex flex-col transform transition-all duration-300 hover:shadow-2xl"
        >
          <div className="relative h-56 sm:h-64">
            <img
              src={order.image || '/placeholder.svg?height=256&width=384'}
              alt={order.details}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-3 left-3 right-3 flex justify-between">
              <StatusBadge status={order.orderstatus} />
              <StatusBadge status={order.status} />
            </div>
            {order.downloaddesign && (
              <DownloadButton url={order.downloaddesign} />
            )}
          </div>
          <div className="p-5 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
                {order.details}
              </h3>
              <div className="space-y-3 text-m">
                <OrderDetail icon={User} label="Customer" value={order.name} />
                <OrderDetail icon={Palette} label="Colour" value={order.colour} />
                <OrderDetail icon={Ruler} label="Size" value={order.size} />
                <OrderDetail icon={Hash} label="Qty" value={order.qty.toString()} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
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
    <span
      className={`${getStatusColor(status)} rounded-full px-3 py-1 text-xs font-bold shadow-md`}
    >
      {status}
    </span>
  )
}

function DownloadButton({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center text-sm font-semibold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="mr-2" size={16} />
      Download Design
    </motion.a>
  )
}

function OrderDetail({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
  return (
    <div className="flex items-center text-gray-700">
      <Icon className="mr-2 flex-shrink-0 text-indigo-600" size={18} />
      <span className="font-medium mr-1">{label}:</span>
      <span className="truncate">{value}</span>
    </div>
  )
}
