import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const storedValueRaw = localStorage.getItem(key);
  const storedValue = storedValueRaw === "true" ? true : storedValueRaw === "false" ? false : initialValue;
  const [value, setValue] = useState(storedValue);

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [value, updateValue];
};

export default useLocalStorage;
