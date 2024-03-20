import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

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
import SlopeDetail from './sub/SlopeDetail'
import WaypointsService from '../services/WaypointsService'
import SlopesService from '../services/SlopesService'

function HomePage() {
  const maxBounds = [
    [27, 86],
    [28, 87],
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
  const [slopes, setSlopes] = useState([])
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
        setSlopes(r.data.map(s => ({ ...s, selected: false })))
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

  const selectSlopesOnMap = async targets => {
    const ids = targets.map(t => t._id)
    await setSlopes(slopes.map(slope => ids.includes(slope._id) ? {...slope, selected:true} : slope))
  }
  const clearSlopesOnMap = async () => {
    await setSlopes(slopes.map(s => ({ ...s, selected: false })))
  }

  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Header />
        <main style={{width:"100%"}}>
          <Grid container rowSpacing={1} sx={{ minHeight: '60vh', p: 5 }}>
            <Grid item xs={12} md={8}>
              <Paper variant='outlined' sx={{ m: 1, height: '100%' }}>
                <MapContainer
                  center={center}
                  zoom={9.5}
                  scrollWheelZoom={true}
                  style={{ minHeight: '60vh', height: '100%' }}
                  maxBounds={maxBounds}
                  maxBoundsViscosity={1}
                  key={slopes.toString()}
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
                      <Marker
                        key={waypoint._id}
                        position={waypoint.coordinates}
                      >
                        <Popup>
                          <WaypointDetail waypoint={waypoint} />
                          <Button
                            sx={{ m: 0.5 }}
                            variant='outlined'
                            onClick={() => {
                              setStartingPoint(waypoint)
                            }}
                          >
                            Start from here
                          </Button>
                          <Button
                            sx={{ m: 0.5 }}
                            variant='outlined'
                            onClick={() => setDestination(waypoint)}
                          >
                            Get here
                          </Button>
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
                        key={slope._id}
                        pathOptions={
                          slope.selected
                            ? {
                                color: colorMap[slope.difficultyLevel],
                                opacity:'1',
                                weight: '15',
                              }
                            : {
                                color: colorMap[slope.difficultyLevel],
                                opacity: '0.3',
                                weight: '10',
                              }
                        }
                        positions={[
                          slope.start.coordinates,
                          slope.end.coordinates,
                        ]}
                      >
                        <Popup style={{ display: 'inline-block' }}>
                          <SlopeDetail slope={slope} />
                        </Popup>
                      </Polyline>
                    ))}
                </MapContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant='outlined' sx={{ m: 1, height: '100%' }}>
                <Container sx={{ p: 3 }}>
                  <Sidebar
                    selectSlopesOnMap={selectSlopesOnMap}
                    clearSlopesOnMap={clearSlopesOnMap}
                    waypoints={waypoints}
                    startingPoint={startingPoint}
                    setStartingPoint={setStartingPoint}
                    destination={destination}
                    setDestination={setDestination}
                  />
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </main>
        <Footer />
      </Stack>
    </>
  )
}

export default HomePage
