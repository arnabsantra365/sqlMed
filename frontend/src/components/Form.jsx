import  { useState } from 'react';
import axios from 'axios';

const countries = [
  { code: '+1', name: 'USA' },
  { code: '+91', name: 'India' },
  // Add more countries as needed
];

const Form = () => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [countryCode, setCountryCode] = useState(localStorage.getItem('countryCode') || '');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = 'Name should contain only alphabetic characters';
    }

    // Country code validation
    if (!countryCode) {
      errors.countryCode = 'Country code is required';
    }

    // Phone number validation
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number should contain only numeric characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form data
      localStorage.setItem('name',name);
      localStorage.setItem('phoneNumber',phoneNumber);
      localStorage.setItem('countryCode',countryCode)
      console.log('Form submitted:', { name, countryCode, phoneNumber });

          // Send form data to backend
    axios.post(`/api/form`, {  name, countryCode, phoneNumber })
    .then(response => {
      console.log(response.data);
      // Clear form fields after successful submission
      setName('');
      setCountryCode('');
      setPhoneNumber('');
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });


      setCountryCode('');
      setName('');
      setPhoneNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <div className="mb-4 flex gap-x-4 ">
        <label htmlFor="name" className="block text-xl font-medium text-gray-400 p-1 ">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 text-white outline-none block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
      </div>
      <div className="mb-4 flex gap-x-4 ">
        <label htmlFor="countryCode" className="block text- font-medium text-gray-400">
          Country Code:
        </label>
        <select
          id="countryCode"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="mt-1 block text-white w-full border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Country Code</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>
        {errors.countryCode && <span className="text-red-500 text-xs">{errors.countryCode}</span>}
      </div>
      <div className="mb-4  flex gap-x-4  ">
        <label htmlFor="phoneNumber" className="block text font-medium text-gray-400">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full border text-white  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber}</span>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
