import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight } from 'lucide-react';

const Login: React.FC = () => {
  const [isUser, setIsUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUser) {
      if (username === 'amit' && password === 'amit') {
        localStorage.setItem('role', 'user');
        navigate('/user');
      } else {
        alert('Invalid user credentials');
      }
    } else {
      if (password === '3582') {
        localStorage.setItem('role', 'admin');
        navigate('/admin');
      } else {
        alert('Invalid admin passcode');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-6"
        >
          <img 
            src="https://bohurupi.com/wp-content/uploads/2024/09/Bohurupi-Favicon-2024.webp" 
            alt="Bohurupi Logo" 
            className="w-24 h-24 mb-4"
          />
          <h2 className="text-4xl font-bold text-center text-white">
            Bohurupi CMS
          </h2>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="bg-white bg-opacity-30 p-1 rounded-full">
            <div className="relative">
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-full shadow-lg"
                animate={{ x: isUser ? 0 : '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <div className="grid grid-cols-2 relative">
                <button
                  className={`py-2 px-4 rounded-full transition-colors duration-200 ${isUser ? 'text-purple-600' : 'text-white'}`}
                  onClick={() => setIsUser(true)}
                >
                  User
                </button>
                <button
                  className={`py-2 px-4 rounded-full transition-colors duration-200 ${!isUser ? 'text-purple-600' : 'text-white'}`}
                  onClick={() => setIsUser(false)}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          {isUser && (
            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pl-12 text-gray-800 bg-white bg-opacity-70 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-opacity-100 transition-all duration-300"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <User className="absolute left-4 top-3.5 h-5 w-5 text-purple-600" />
              </div>
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              {isUser ? 'Password' : 'Passcode'}
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pl-12 text-gray-800 bg-white bg-opacity-70 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-opacity-100 transition-all duration-300"
                id="password"
                type="password"
                placeholder={isUser ? '••••••••' : '••••'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-purple-600" />
            </div>
          </motion.div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg"
            type="submit"
          >
            Sign In
            <ChevronRight className="inline-block ml-2 h-5 w-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
