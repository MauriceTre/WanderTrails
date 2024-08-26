// src/utils/wanderwege.js

const trails = [
    { name: 'Trail 1' },
    { name: 'Trail 2' },
    { name: 'Trail 3' },
  ];
  
  export const getSavedHikingTrails = async () => {
    // Simulate fetching data from an API or local storage
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(trails);
      }, 1000);
    });
  };
  