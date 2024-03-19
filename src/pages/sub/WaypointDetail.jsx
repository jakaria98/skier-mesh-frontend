

function WaypointDetail({ waypoint }) {
  return (
    <div>
      <h3>Waypoint Details</h3>
      <p>Name: {waypoint.name}</p>
      <p>Coordinate: {waypoint.coordinate[0]}, {waypoint.coordinate[1]}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default WaypointDetail;
