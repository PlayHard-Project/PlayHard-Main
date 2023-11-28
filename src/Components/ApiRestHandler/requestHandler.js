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
 * Performs a search for elements on a specific route using a search query.
 *
 * @param {string} route - The route on which to perform the search.
 * @param {string} query - The search query to use for filtering the elements.
 *
 * @returns {Promise<Array>} A promise that resolves with the elements that match the search query.
 *
 * @throws {Error} Throws an error if there is an issue performing the search.
 */
export const searchElements = async (route, query) => {
  try {
    const response = await axios.get(`${apiURL}${route}/search`, { params: { search: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching elements: ', error);
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
    console.log(apiURL + route, elementToUpdate._id);
    const response = await axios.put(apiURL + route + '/' + elementToUpdate._id, elementToUpdate);
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
