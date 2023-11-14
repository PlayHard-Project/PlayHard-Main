import axios from 'axios';

const apiURL = process.env.REACT_APP_BRANCH === 'test' ? 'https://backend-fullapirest-test.onrender.com' : 'https://backend-fullapirest.onrender.com/api/';

console.log(process.env.REACT_APP_BRANCH);
console.log(apiURL);

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
    const response = await axios.post(apiURL + route, elementToUpdate);
    return response.data;
  } catch (error) {
    console.error('Error updating the element: ', error);
    throw error; 
  }
};

export const removeElement = async (productId, route) => {
  try {
    const response = await axios.delete(apiURL + route + '/' + productId);
    return response.data;
  } catch (error) {
    console.error('Error removing product:', error);
    throw error; 
  }
};