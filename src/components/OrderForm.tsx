import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, Palette, Ruler, Hash, Image, Link, Truck, CreditCard, Box } from 'lucide-react';
import { fetchOrders } from '../api';

export default function Component() {
  const [formData, setFormData] = useState({
    status: 'Pending',
    orderstatus: 'Prepaid',
    courier: 'Delivery',
    shipstatus: 'Not Shipped',
    name: '',
    details: 'Pure Cotton',
    colour: 'Black',
    size: '',
    qty: 1,
    image: '',
    downloaddesign: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetchOrders(formData);

      if (response) {
        setSubmitMessage('Order submitted successfully!');
        setFormData({
          status: 'Pending',
          orderstatus: 'Prepaid',
          courier: 'Delivery',
          shipstatus: 'Not Shipped',
          name: '',
          details: 'Pure Cotton',
          colour: 'Black',
          size: '',
          qty: 1,
          image: '',
          downloaddesign: '',
        });
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "block w-full pl-10 pr-3 py-2 text-base border-2 border-opacity-50 focus:border-opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm rounded-md transition-all duration-200 ease-in-out";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  let index = 0;

  const getIconColor = (index) => {
    const colors = ['text-blue-500', 'text-purple-500', 'text-pink-500', 'text-green-500', 'text-yellow-500', 'text-red-500'];
    return colors[index % colors.length];
  };

  const getFieldColors = (index) => {
    const colors = ['border-blue-300 focus:border-blue-500 focus:ring-blue-500', 'border-purple-300 focus:border-purple-500 focus:ring-purple-500', 'border-pink-300 focus:border-pink-500 focus:ring-pink-500', 'border-green-300 focus:border-green-500 focus:ring-green-500', 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500', 'border-red-300 focus:border-red-500 focus:ring-red-500'];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Create New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="status" className={labelClasses}>Status</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="orderstatus" className={labelClasses}>Order Status</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <select
                id="orderstatus"
                name="orderstatus"
                value={formData.orderstatus}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              >
                <option value="Prepaid">Prepaid</option>
                <option value="COD">COD</option>
              </select>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="courier" className={labelClasses}>Courier</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Truck className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <select
                id="courier"
                name="courier"
                value={formData.courier}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              >
                <option value="Delivery">Delivery</option>
                <option value="Xpressbees">Xpressbees</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="shipstatus" className={labelClasses}>Ship Status</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Box className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <select
                id="shipstatus"
                name="shipstatus"
                value={formData.shipstatus}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              >
                <option value="Not Shipped">Not Shipped</option>
                <option value="Shipped">Shipped</option>
                <option value="In Transit">In Transit</option>
              </select>
            </div>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label htmlFor="name" className={labelClasses}>Customer Name</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className={`h-5 w-5 ${getIconColor(index++)}`} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClasses} ${getFieldColors(index -1)}`}
              placeholder="Enter customer name"
            />
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label htmlFor="details" className={labelClasses}>Product Details</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package className={`h-5 w-5 ${getIconColor(index++)}`} />
            </div>
            <select
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className={`${inputClasses} ${getFieldColors(index -1)}`}
            >
              <option value="Pure Cotton">Pure Cotton</option>
              <option value="Full Sleeve">Full Sleeve</option>
              <option value="Poly Cotton">Poly Cotton</option>
              <option value="Polyester">Polyester</option>
              <option value="Mobile Cover">Mobile Cover</option>
              <option value="Coffee Mug">Coffee Mug</option>
            </select>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="colour" className={labelClasses}>Colour</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Palette className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <select
                id="colour"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              >
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Maroon">Maroon</option>
                <option value="Yellow">Yellow</option>
                <option value="None">None</option>
              </select>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="size" className={labelClasses}>Size/Model</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={`${inputClasses} ${getFieldColors(index -1)}`}
                placeholder="Enter size or model"
              />
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <label htmlFor="qty" className={labelClasses}>Quantity</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className={`h-5 w-5 ${getIconColor(index++)}`} />
              </div>
              <input
                type="number"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                min="1"
                className={`${inputClasses} ${getFieldColors(index -1)}`}
              />
            </div>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label htmlFor="image" className={labelClasses}>Product Image URL</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image className={`h-5 w-5 ${getIconColor(index++)}`} />
            </div>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`${inputClasses} ${getFieldColors(index -1)}`}
              placeholder="Enter image URL"
            />
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label htmlFor="downloaddesign" className={labelClasses}>Download Design URL</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className={`h-5 w-5 ${getIconColor(index++)}`} />
            </div>
            <input
              type="url"
              id="downloaddesign"
              name="downloaddesign"
              value={formData.downloaddesign}
              onChange={handleChange}
              className={`${inputClasses} ${getFieldColors(index -1)}`}
              placeholder="Enter design download URL"
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </motion.div>
      </form>
      <AnimatePresence>
        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 text-center p-3 rounded-md ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}`}
          >
            {submitMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}