"use client"

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Package, CheckSquare, Edit } from 'lucide-react'
import { motion } from 'framer-motion'

interface MobileNavbarProps {
  role: 'admin' | 'user'
}

export default function MobileNavbar({ role }: MobileNavbarProps) {
  const location = useLocation()

  const navItems = role === 'admin'
    ? [
        { icon: Home, label: 'Home', path: '/admin' },
        { icon: Package, label: 'Orders', path: '/admin/orders' },
        { icon: Edit, label: 'Edit', path: '/admin/edit-orders' },
      ]
    : [
        { icon: Home, label: 'Home', path: '/user' },
        { icon: Package, label: 'Pending', path: '/user/pending' },
        { icon: CheckSquare, label: 'Completed', path: '/user/completed' },
      ]

  const colors = [
    'from-pink-500 to-purple-500',
    'from-yellow-400 to-orange-500',
    'from-green-400 to-cyan-500',
  ]

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 bg-white rounded-full shadow-lg md:hidden"
    >
      <div className="flex justify-around items-center p-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center relative"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isActive
                    ? `bg-gradient-to-r ${colors[index % colors.length]} shadow-md`
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition-all duration-300`}
              >
                <Icon
                  size={24}
                  className={`${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 group-hover:text-gray-800'
                  }`}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white opacity-30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-gray-800' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}