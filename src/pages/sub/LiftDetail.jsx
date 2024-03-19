import React from 'react';

function LiftDetail({ lift }) {
  return (
    <div>
      <h3>Lift Details</h3>
      <p>Name: {lift.name}</p>
      <p>Type: {lift.type}</p>
      <p>Status: {lift.status}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default LiftDetail;
