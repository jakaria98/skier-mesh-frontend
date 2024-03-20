

function WaypointDetail({ waypoint }) {
  return (
    <div>
      <h3>Waypoint Details</h3>
      <p>Name: {waypoint.name}</p>
      <p>Coordinate: {waypoint.coordinates[0]}, {waypoint.coordinates[1]}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default WaypointDetail;
