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
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-green-100 text-green-800'
      case 'delivered':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col"
        >
          <div className="relative h-48">
            <img
              src={order.image || '/placeholder.svg?height=160&width=320'}
              alt={order.details}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <span
                className={`${getStatusColor(
                  order.status
                )} rounded-full px-2 py-1 text-xs font-semibold`}
              >
                {order.status}
              </span>
            </div>
            <div className="absolute top-2 left-2">
              <span className={`${getStatusColor(order.orderstatus)} rounded-full px-2 py-1 text-xs font-semibold`}>
                {order.orderstatus}
              </span>
            </div>
            {order.downloaddesign && (
              <a
                href={order.downloaddesign}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 right-2 w-full bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground py-1.5 px-2 rounded-md hover:from-primary/90 hover:to-primary-foreground/90 transition-all duration-300 flex items-center justify-center text-xs"
              >
                <Download className="mr-1" size={12} />
                Download Design
              </a>
            )}
          </div>
          <div className="p-2 sm:p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                {order.details}
              </h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center text-gray-600">
                  <User className="mr-1 flex-shrink-0" size={12} />
                  <span className="font-medium mr-1">Customer:</span>
                  <span className="truncate">{order.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Palette className="mr-1 flex-shrink-0" size={12} />
                  <span className="font-medium mr-1">Colour:</span>
                  <span>{order.colour}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Ruler className="mr-1 flex-shrink-0" size={12} />
                  <span className="font-medium mr-1">Size:</span>
                  <span>{order.size}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Hash className="mr-1 flex-shrink-0" size={12} />
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