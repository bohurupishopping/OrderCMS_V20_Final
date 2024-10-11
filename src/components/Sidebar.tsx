"use client"

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Package, CheckSquare, LogOut, ChevronLeft, ChevronRight, User, Edit } from 'lucide-react'

interface SidebarProps {
  role: 'admin' | 'user'
}

export default function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = role === 'admin'
    ? [
        { icon: Home, label: 'Dashboard', path: '/admin' },
        { icon: Package, label: 'Orders', path: '/admin/orders' },
        { icon: Edit, label: 'Edit Orders', path: '/admin/edit-orders' },
      ]
    : [
        { icon: Home, label: 'Dashboard', path: '/user' },
        { icon: Package, label: 'Pending Orders', path: '/user/pending' },
        { icon: CheckSquare, label: 'Completed Orders', path: '/user/completed' },
      ]

  const handleLogout = () => {
    localStorage.removeItem('role')
    navigate('/')
  }

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '80px' },
  }

  return (
    <motion.div
      initial="expanded"
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white shadow-xl z-20 flex flex-col hidden md:flex rounded-r-3xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
        <motion.img
          src="https://app.bohurupi.com/bohurupi_favcon.png"
          alt="Bohurupi Logo"
          className="w-10 h-10 rounded-full bg-white p-1"
          animate={{ rotate: isCollapsed ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-white"
            >
              Bohurupi CMS
            </motion.h2>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} className="text-white" /> : <ChevronLeft size={20} className="text-white" />}
        </motion.button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center py-3 px-4 my-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon
                  size={24}
                  className={`${isActive ? 'text-white' : 'text-gray-400'} transition-colors duration-200`}
                />
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center mb-4">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={role === 'admin' ? 'https://i.pravatar.cc/150?img=3' : 'https://i.pravatar.cc/150?img=12'}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-500"
          />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-semibold text-sm">
                  {role === 'admin' ? 'Pritam' : 'Amit Munshi'}
                </p>
                <p className="text-xs text-gray-500">
                  {role === 'admin' ? 'pritam@bohurupi.com' : 'amit@bohurupi.com'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className={`flex items-center py-2 px-4 w-full rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md`}
        >
          <LogOut size={20} className="text-white" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
}