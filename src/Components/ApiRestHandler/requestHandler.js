import axios from 'axios';

const apiURL = process.env.REACT_APP_BRANCH === 'test' ? 'https://backend-fullapirest-test.onrender.com/api/' : 'https://backend-fullapirest.onrender.com/api/';
console.log(process.env.REACT_APP_BRANCH);


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

/**
 * Asynchronous function to fetch elements based on a search query.
 * @function
 * @async
 * @param {string} route - API route for fetching elements.
 * @param {string} search - Search query to filter elements.
 * @returns {Promise<Array>} Promise resolving to an array of elements based on the search query.
 */
export const getElementsWithSearch = async (route, search) => {
  try {
    const response = await axios.get(`${apiURL}${route}?search=${search}`);
    return response.data;
  } catch (error) {
    console.error('Error getting elements: ', error);
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

export const getElementsLazyLoading = async (route, page = 1) => {
  try {
    const response = await axios.get(apiURL + route, {
      params: {
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all elements: ', error);
    throw error;
  }
};
