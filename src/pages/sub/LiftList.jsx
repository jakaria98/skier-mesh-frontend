import React from 'react';

function LiftList({ lifts }) {
  return (
    <div>
      <h3>Lifts</h3>
      <ul>
        {lifts.map((lift, index) => (
          <li key={index}>{lift.name} - Status: {lift.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default LiftList;
