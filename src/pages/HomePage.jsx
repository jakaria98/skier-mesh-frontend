import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import {
  MapContainer,
  //  TileLayer,
  //  useMap,
  Marker,
  Popup,
  ImageOverlay,
  Polyline,
} from 'react-leaflet'
import WaypointDetail from './sub/WaypointDetail'
//import LiftDetail from './sub/LiftDetail'
import SlopeDetail from './sub/SlopeDetail'
import WaypointsService from '../services/WaypointsService'
//import LiftsService from '../services/LiftsService'
import SlopesService from '../services/SlopesService'

function HomePage() {
  const maxBounds = [
    [27.982, 86.918],
    [27.995, 86.932],
  ]
  const center = [
    (maxBounds[0][0] + maxBounds[1][0]) / 2,
    (maxBounds[0][1] + maxBounds[1][1]) / 2,
  ]
  const sampleWaypoints = [
    { name: 'p0', coordinates: [1.66, 3.18] },
    { name: 'p1', coordinates: [0.34, 1.22] },
    { name: 'p2', coordinates: [2.2, 1.05] },
    { name: 'p3', coordinates: [2.53, 5.16] },
    { name: 'p4', coordinates: [1.52, 5.78] },
    { name: 'p5', coordinates: [0.12, 4.02] },
  ]
  const colorMap = {
    Level1: 'blue',
    Level2: 'red',
    Level3: 'black',
  }
  const [waypoints, setWaypoints] = useState([])
  //const [lifts, setLifts] = useState([])
  const [slopes, setSlopes] = useState([])
  const clearedSlopes = useRef([])
  const [startingPoint, setStartingPoint] = useState()
  const [destination, setDestination] = useState()
  useEffect(() => {
    WaypointsService.getWaypoints()
      .then(r => setWaypoints(r.data))
      .catch(console.error)
    //setWaypoints(sampleWaypoints)
  }, [])
  useEffect(() => {
    SlopesService.getSlopes()
      .then(r => {
        setSlopes(r.data)
        clearedSlopes.current = r.data
      })
      .catch(console.error)
  }, [])
  /* useEffect(() => {
    // Fetch lifts and set state
    //LiftsService.getLifts().then(r => setLifts(r.data)).catch(console.error) // Uncomment after implementing service
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
    ])
  }, []) */

  const selectSlopeOnMap = slope => {
    setSlopes(
      slopes.map(s =>
        s._id == slope._id ? { ...slope, selected: true } : slope
      )
    )
  }
  const clearSlopesOnMap = () => {
    setSlopes(clearedSlopes.current)
  }

  return (
    <>
      <Header />
      <main>
        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: '900px', width: '1200px' }}
          maxBounds={maxBounds}
          maxBoundsViscosity={1}
        >
          {/*<TileLayer
            nowrap={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />*/}
          <ImageOverlay
            url={
              'https://jamesniehues.com/cdn/shop/products/199.1_CottonwoodCanyons2001Book_Feb_1_19.jpg'
            }
            bounds={maxBounds}
            opacity={1}
          />
          {waypoints &&
            waypoints.map(waypoint => (
              <Marker key={waypoint.name} position={waypoint.coordinates}>
                <Popup>
                  <WaypointDetail waypoint={waypoint} />
                  <button onClick={() => setStartingPoint(waypoint)}>
                    Start from here
                  </button>
                  <button onClick={() => setDestination(waypoint)}>
                    Get here
                  </button>
                </Popup>
              </Marker>
            ))}
          {/* {lifts.map(lift => (
            <Polyline
              key={lift.liftID}
              pathOptions={{ color: 'green' }}
              positions={lift.waypoints.map(w => w.coordinates)}
              //onMouseOver={e => e.target.openPopup()}
            >
              <Popup style={{ display: 'inline-block' }}>
                <LiftDetail lift={lift} />
              </Popup>
            </Polyline>
          ))} */}
          {slopes &&
            slopes.map(slope => (
              <Polyline
                key={slope.id}
                pathOptions={
                  slope.selected
                    ? {
                        color: colorMap[slope.difficultyLevel],
                        weight: '15',
                      }
                    : {
                        color: colorMap[slope.difficultyLevel],
                        opacity: '0.3',
                        weight: '10',
                      }
                }
                positions={[slope.start.coordinates, slope.end.coordinates]}
              >
                <Popup style={{ display: 'inline-block' }}>
                  <SlopeDetail slope={slope} />
                </Popup>
              </Polyline>
            ))}
        </MapContainer>
        <Sidebar
          selectSlopeOnMap={selectSlopeOnMap}
          clearSlopesOnMap={clearSlopesOnMap}
          waypoints={waypoints}
          startingPoint={startingPoint}
          setStartingPoint={setStartingPoint}
          destination={destination}
          setDestination={setDestination}
        />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
