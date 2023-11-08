import axios from 'axios';

const apiURL = 'http://localhost:9000/api'; 

export const addElement = async (newElement, route) => {
  try {
    const response = await axios.post(apiURL + route, newElement);
    return response.data;
  } catch (error) {
    console.error('Error adding the new element: ', error);
    throw error; 
  }
};

export const getElements = async (route) => {
  try {
    const response = await axios.get(apiURL + route);
    return response.data;
  } catch (error) {
    console.error('Error getting all elements: ', error);
    throw error; 
  }
};

export const getElementByID = async (elemenetId, route) => {
  try {
    const response = await axios.get(apiURL + route + '/' + elemenetId);
    return response.data;
  } catch (error) {
    console.error('Error getting the specified element: ', error);
    throw error; 
  }
};

export const updateElement = async (elementToUpdate, route) => {
  try {
    const response = await axios.post(apiURL + route, newProduct);
    return response.data;
  } catch (error) {
    console.error('Error updating the element: ', error);
    throw error; 
  }
};
