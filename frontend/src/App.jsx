import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mood, setMood] = useState('');
  const [outfit, setOutfit] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [error, setError] = useState(null);
  const [newOutfit, setNewOutfit] = useState({ category: '', mood: '' });
  const [updateOutfit, setUpdateOutfit] = useState({ id: '', category: '', mood: '' });

  // Function to fetch random outfit based on mood
  const getRandomOutfit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/random-outfit', { mood });
      setOutfit(response.data); // Save the outfit data
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching random outfit:', err);
      setError(err.response?.data?.error || 'An error occurred');
      setOutfit(null); // Clear outfit data in case of error
    }
  };

  // Fetch all outfits
  const getAllOutfits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/outfits');
      setOutfits(response.data); // Save all outfits data
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching outfits:', err);
      setError('Error fetching outfits');
    }
  };

  // Function to add a new outfit
  const addOutfit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/outfit', newOutfit);
      setOutfits([...outfits, response.data]); // Add the new outfit to the list
      setNewOutfit({ category: '', mood: '' }); // Clear input fields
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error adding outfit:', err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  // Function to update an existing outfit
  const updateOutfitById = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/outfit/${updateOutfit.id}`,
        { category: updateOutfit.category, mood: updateOutfit.mood }
      );
      setOutfits(
        outfits.map((outfit) =>
          outfit._id === response.data._id ? response.data : outfit
        )
      ); // Update the outfit in the list
      setUpdateOutfit({ id: '', category: '', mood: '' }); // Clear input fields
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error updating outfit:', err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  // Function to delete an outfit by ID
  const deleteOutfit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/outfit/${id}`);
      setOutfits(outfits.filter((outfit) => outfit._id !== id)); // Remove deleted outfit from the list
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error deleting outfit:', err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="App p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Outfit Management</h1>

      {/* Mood input and button to fetch random outfit */}
      <div className="mb-6">
        <label htmlFor="mood" className="block text-sm font-medium text-gray-700">Mood:</label>
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Enter your mood (happy, sad, excited)"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getRandomOutfit}
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Get Random Outfit
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {outfit && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Random Outfit:</h2>
          <ul className="list-disc pl-6 mt-2">
            {Object.entries(outfit).map(([category, item], index) => (
              <li key={index} className="text-gray-700">
                <strong>{category}:</strong> {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Outfit CRUD Operations */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Outfit</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Category"
            value={newOutfit.category}
            onChange={(e) => setNewOutfit({ ...newOutfit, category: e.target.value })}
            className="p-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Mood"
            value={newOutfit.mood}
            onChange={(e) => setNewOutfit({ ...newOutfit, mood: e.target.value })}
            className="p-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addOutfit}
          className="mt-4 p-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Add Outfit
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Outfit</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Outfit ID"
            value={updateOutfit.id}
            onChange={(e) => setUpdateOutfit({ ...updateOutfit, id: e.target.value })}
            className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={updateOutfit.category}
            onChange={(e) => setUpdateOutfit({ ...updateOutfit, category: e.target.value })}
            className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Mood"
            value={updateOutfit.mood}
            onChange={(e) => setUpdateOutfit({ ...updateOutfit, mood: e.target.value })}
            className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={updateOutfitById}
          className="mt-4 p-2 w-full bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
        >
          Update Outfit
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Outfits</h2>
        <ul>
          {outfits.map((outfit) => (
            <li key={outfit._id} className="flex justify-between items-center mb-2 p-2 border-b border-gray-300">
              <span className="text-gray-700">{outfit.category} - {outfit.mood}</span>
              <button
                onClick={() => deleteOutfit(outfit._id)}
                className="ml-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
