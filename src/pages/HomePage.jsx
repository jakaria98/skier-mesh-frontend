import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    ImageOverlay,
    Polyline,
} from 'react-leaflet';
import WaypointDetail from './sub/WaypointDetail';
import LiftDetail from './sub/LiftDetail';

function HomePage() {
    const maxBounds = [
        [0, 0],
        [3, 6],
    ];
    const center = [1.5, 3.5];
    const sampleWaypoints = [
        { name: 'p0', coordinate: [1.66, 3.18] },
        { name: 'p1', coordinate: [0.34, 1.22] },
        { name: 'p2', coordinate: [2.2, 1.05] },
        { name: 'p3', coordinate: [2.53, 5.16] },
        { name: 'p4', coordinate: [1.52, 5.78] },
        { name: 'p5', coordinate: [0.12, 4.02] },
    ];
    const [waypoints, setWaypoints] = useState([]);
    const [lifts, setLifts] = useState([]);
    const [slopes, setSlopes] = useState([]);
    useEffect(() => {
        //PointsService.getPoints().then(r => setPoints(r))
        setWaypoints(sampleWaypoints);
    }, []);
    useEffect(() => {
        // Fetch lifts and set state
        // LiftsService.getLifts().then(setLifts).catch(console.error); // Uncomment after implementing service
        setLifts([
            {
                liftID: 0,
                name: 'l0',
                type: 'Chairlift',
                capacity: 20,
                status: 'Open',
                schedule: { open: '11:30', closed: '15:30' },
                waypoints: [sampleWaypoints[1], sampleWaypoints[0]],
            },
            {
                liftID: 2,
                name: 'l1',
                type: 'T-Bar',
                capacity: 30,
                status: 'Open',
                schedule: { open: '11:30', closed: '15:30' },
                waypoints: [sampleWaypoints[5], sampleWaypoints[3]],
            },
        ]);
    }, []);
    return (
        <div className="container-fluid">
            <h2 className="text-center mt-5">Welcome to Skier Mesh</h2>
            <main className="d-flex justify-content-center align-items-center vh-100">
                <div>
                    <div style={{ height: '550px', width: '800px' }}>
                        <MapContainer
                            center={center}
                            zoom={8}
                            scrollWheelZoom={true}
                            style={{ height: '100%', width: '100%' }}
                            maxBounds={maxBounds}
                            maxBoundsViscosity={1}
                        >
                            <ImageOverlay
                                url={
                                    'https://jamesniehues.com/cdn/shop/products/199.1_CottonwoodCanyons2001Book_Feb_1_19.jpg'
                                }
                                bounds={maxBounds}
                                opacity={1}
                            />
                            {waypoints.map((waypoint) => (
                                <Marker key={waypoint.name} position={waypoint.coordinate}>
                                    <Popup>
                                        <WaypointDetail waypoint={waypoint} />
                                    </Popup>
                                </Marker>
                            ))}
                            {lifts.map((lift) => (
                                <Polyline
                                    key={lift.liftID}
                                    pathOptions={{ color: 'green' }}
                                    positions={lift.waypoints.map((w) => w.coordinate)}
                                >
                                    <Popup style={{ display: 'inline-block' }}>
                                        <LiftDetail lift={lift} />
                                    </Popup>
                                </Polyline>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
