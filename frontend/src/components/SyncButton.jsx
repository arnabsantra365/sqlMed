import React from 'react';
import axios from 'axios';
import { api } from '../../services/helper';
const SyncButton = () => {
  const handleSync = async () => {
    try {
      const response = await axios.get(`${api}/api/sync`);
      alert(response.data.message || 'Data synchronized successfully');
    } catch (error) {
      console.error('Error syncing data:', error);
      alert('Failed to sync data.');
    }
  };

  return (
    <>
    <button className=" text-white" onClick={handleSync}>Sync</button>
    </>
  );
};

export default SyncButton;
