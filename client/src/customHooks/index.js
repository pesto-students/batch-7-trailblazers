import { useState } from 'react';

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange
  };
};
