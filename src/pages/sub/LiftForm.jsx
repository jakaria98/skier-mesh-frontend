import React, { useState } from 'react';

function LiftForm({ onSubmit, initialLift = {} }) {
  const [lift, setLift] = useState(initialLift);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLift((prevLift) => ({
      ...prevLift,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lift);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={lift.name || ''} onChange={handleChange} />
      </label>
      <label>
        Type:
        <input name="type" value={lift.type || ''} onChange={handleChange} />
      </label>
      <label>
        Status:
        <select name="status" value={lift.status || ''} onChange={handleChange}>
          <option value="operational">Operational</option>
          <option value="closed">Closed</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </label>
      {/* Add more fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LiftForm;
