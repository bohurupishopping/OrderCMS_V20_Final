import axios from 'axios';

export const API_URL = 'https://sheetlabs.com/BSIN/mitra';
export const USERNAME = 'pritam@bohurupi.com';
export const PASSWORD = 'c!!tPgprDz7A2:dq3C[X';

export const fetchOrders = async (newOrder?: any) => {
  try {
    if (newOrder) {
      // If newOrder is provided, submit a new order
      const response = await axios.post(API_URL, [newOrder], {
        auth: {
          username: USERNAME,
          password: PASSWORD,
        },
      });
      return response.status === 204;
    } else {
      // If no newOrder is provided, fetch existing orders
      const response = await axios.get(API_URL, {
        auth: {
          username: USERNAME,
          password: PASSWORD,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error with API operation:', error);
    return null;
  }
};