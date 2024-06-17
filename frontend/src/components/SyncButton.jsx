import React from 'react';
import axios from 'axios';
import { URL } from '../../services/helper';
const SyncButton = () => {
  const handleSync = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sync`);
      alert(response.data.message || 'Data synchronized successfully');
    } catch (error) {
      console.error('Error syncing data:', error);
      alert('Failed to sync data.');
    }
  };

  return (
    <>
    {/* <button className=" text-white" onClick={handleSync}>Refresh</button> */}
    <button type="button" onClick={handleSync} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Refresh</button>
    </>
  );
};

export default SyncButton;
