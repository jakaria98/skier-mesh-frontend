import React from 'react';

function SlopeDetail({ slope }) {
  return (
    <div>
      <h3>Slope Details</h3>
      <p>Name: {slope.name}</p>
      <p>Difficulty Level: {slope.difficultyLevel}</p>
      <p>Length: {slope.length} meters</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default SlopeDetail;
