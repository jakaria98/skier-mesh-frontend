import React from 'react';

function SlopeList({ slopes }) {
  return (
    <div>
      <h3>Available Slopes</h3>
      <ul>
        {slopes.map((slope, index) => (
          <li key={index}>{slope.name} - Difficulty: {slope.difficultyLevel}</li>
        ))}
      </ul>
    </div>
  );
}

export default SlopeList;
