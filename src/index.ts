// src/index.ts
import './index.css';

import * as fs from 'fs';



async function fetchJsonFromServer(filePath: string) {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return jsonData;
  }

const filePath = 'db.json';

fetchJsonFromServer(filePath)
  .then(jsonData => {
    console.log(jsonData); // Use the parsed JSON data
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });