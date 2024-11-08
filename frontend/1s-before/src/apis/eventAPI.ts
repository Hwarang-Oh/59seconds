import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const createEvent = async (eventData: FormData) => {
    try {
      const response = await api.post('/rooms', eventData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data; // roomId
    } catch (error) {
      console.error('Error while creating event:', error);
      throw error; 
    }
  };