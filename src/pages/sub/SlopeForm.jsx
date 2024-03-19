import React, { useState } from 'react';

function SlopeForm({ onSubmit, initialSlope = {} }) {
  const [slope, setSlope] = useState(initialSlope);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlope((prevSlope) => ({
      ...prevSlope,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(slope);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={slope.name || ''} onChange={handleChange} />
      </label>
      <label>
        Difficulty Level:
        <input name="difficultyLevel" value={slope.difficultyLevel || ''} onChange={handleChange} />
      </label>
      <label>
        Length (in meters):
        <input type="number" name="length" value={slope.length || ''} onChange={handleChange} />
      </label>
      {/* Add more fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SlopeForm;
