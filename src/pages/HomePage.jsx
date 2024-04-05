import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import L from 'leaflet'

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
import LiftDetail from './sub/LiftDetail'
import WaypointsService from '../services/WaypointsService'
import SlopesService from '../services/SlopesService'
import LiftsService from '../services/LiftsService'

function HomePage() {
  const maxBounds = [
    [27.1, 85.6],
    [28.3, 87.3],
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
  const difficultyMap = {
    Level1: 0,
    Level2: 1,
    Level3: 2,
  }
  const [waypoints, setWaypoints] = useState([])
  const [slopes, setSlopes] = useState([])
  const [lifts, setLifts] = useState([])
  const [startingPoint, setStartingPoint] = useState()
  const [destination, setDestination] = useState()
  const [levelsShown, setLevelsShown] = useState([true, true, true])
  useEffect(() => {
    WaypointsService.getWaypoints()
      .then(r => setWaypoints(r.data))
      .catch(console.error)
    //setWaypoints(sampleWaypoints)
  }, [])
  useEffect(() => {
    SlopesService.getSlopes()
      .then(r => {
        setSlopes(r.data.map(s => ({ ...s, selected: 0 })))
      })
      .catch(console.error)
  }, [])
  useEffect(() => {
    LiftsService.getLifts()
      .then(r => {
        setLifts(r.data.map(s => ({ ...s, selected: 0 })))
      })
      .catch(console.error)
  }, [])

  const selectSlopesOnMap = async targets => {
    const ids = targets.map(t => t._id)
    await setSlopes(
      slopes.map(slope =>
        ids.includes(slope._id) ? { ...slope, selected: 1 } : slope
      )
    )
  }
  const clearSlopesOnMap = async () => {
    await setSlopes(slopes.map(s => ({ ...s, selected: 0 })))
  }

  function createCurvedLine(start, end) {
    const latlngs = []

    const offsetX = end[1] - start[1],
      offsetY = end[0] - start[0]

    const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
      theta = Math.atan2(offsetY, offsetX)

    const thetaOffset = 3.14 / 10

    const r2 = r / 2 / Math.cos(thetaOffset),
      theta2 = theta + thetaOffset

    const midpointX = r2 * Math.cos(theta2) + start[1],
      midpointY = r2 * Math.sin(theta2) + start[0]

    const midpointLatLng = [midpointY, midpointX]
    latlngs.push(start, midpointLatLng, end)
    return latlngs
  }

  const liftIcon = L.icon({
    iconUrl:
      'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20shape-rendering%3D%22geometricPrecision%22%20text-rendering%3D%22geometricPrecision%22%20image-rendering%3D%22optimizeQuality%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20viewBox%3D%220%200%2021%2021%22%3E%20%20%20%20%3Cellipse%20fill%3D%22%2315bc3f%22%20stroke%3D%22%23000%22%20cx%3D%2210.5%22%20cy%3D%2210.5%22%20rx%3D%2210%22%20ry%3D%2210%22%2F%3E%20%20%20%20%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M7.087%207.327V5.698L.844%207.894c.091-.34.2-.671.325-.995L15.522%201.85c.302.176.594.367.875.573l-1.994.701v3.238c-.544.24-1.035.5-1.312.777a1.129%201.129%200%200%200-.334.798v4.973c.001.31.129.591.334.797.205.205.488.333.798.333%200-.003%201.682%200%201.837%200v.685c-.155%200-1.837.003-1.837%200-.5%200-.956-.205-1.285-.534a1.815%201.815%200%200%201-.532-1.28V7.937c0-.5.206-.956.536-1.285.277-.277.712-.513%201.206-.73v-2.59L8.196%205.307v2.019h2.574c.465%200%20.773.398.832.832v7.204c-.066.47-.424.83-.832.833H4.513c-.408-.004-.766-.362-.833-.833V8.16c.065-.474.406-.824.8-.832h2.607zm3.048.962H8.727a.705.705%200%200%200-.704.704v2.372c0%20.388.317.704.704.704h1.408a.705.705%200%200%200%20.703-.704V8.993a.705.705%200%200%200-.703-.704zm-4.987%200h1.408c.387%200%20.703.316.703.704v2.372a.705.705%200%200%201-.703.704H5.148a.705.705%200%200%201-.704-.704V8.993c0-.388.317-.704.704-.704zm12.007%204.852a.55.55%200%200%200-.55-.55l-1.671-.055.055-2.439c0-.455-.425-.825-.88-.825-.456%200-.88.37-.88.825l.057%203.044c0%20.304.247.55.55.55h2.357v2.023a.482.482%200%200%200%20.962%200v-2.573zM14.11%207.327a.816.816%200%201%200%200%201.632.816.816%200%200%200%200-1.632z%22%2F%3E%3C%2Fsvg%3E',

    iconAnchor: [9.525, 9.525], // point of the icon which will correspond to marker's location
  })

  return (
    <>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Header />
        <main style={{ width: '100%' }}>
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
                      //'https://jamesniehues.com/cdn/shop/products/199.1_CottonwoodCanyons2001Book_Feb_1_19.jpg'
                      '../public/map.png'
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
                  {lifts &&
                    lifts.map(lift => (
                      <Polyline
                        key={lift._id}
                        pathOptions={
                          lift.selected
                            ? {
                                color: 'black',
                                opacity: '1',
                                weight: '8',
                                dashArray: '15,10',
                              }
                            : {
                                color: 'black',
                                opacity: '0.5',
                                weight: '5',
                                dashArray: '15,10',
                              }
                        }
                        positions={[
                          lift.waypoints[0].coordinates,
                          lift.waypoints[1].coordinates,
                        ]}
                      >
                        <Popup style={{ display: 'inline-block' }}>
                          <LiftDetail lift={lift} />
                        </Popup>
                        <Marker
                          icon={liftIcon}
                          position={[
                            (lift.waypoints[0].coordinates[0] +
                              lift.waypoints[1].coordinates[0]) /
                              2,
                            (lift.waypoints[0].coordinates[1] +
                              lift.waypoints[1].coordinates[1]) /
                              2,
                          ]}
                          opacity={lift.selected ? 1 : 0.5}
                        >
                          <Popup style={{ display: 'inline-block' }}>
                            <LiftDetail lift={lift} />
                          </Popup>
                        </Marker>
                      </Polyline>
                    ))}
                  {slopes &&
                    slopes.map(slope => (
                      levelsShown[difficultyMap[slope.difficultyLevel]] ? <Polyline
                        key={slope._id}
                        pathOptions={
                          slope.selected
                            ? {
                                color: colorMap[slope.difficultyLevel],
                                opacity: '1',
                                weight: '8',
                              }
                            : {
                                color: colorMap[slope.difficultyLevel],
                                opacity: '0.3',
                                weight: '5',
                              }
                        }
                        positions={createCurvedLine(
                          slope.start.coordinates,
                          slope.end.coordinates
                        )}
                      >
                        <Popup style={{ display: 'inline-block' }}>
                          <SlopeDetail slope={slope} />
                        </Popup>
                      </Polyline>
                      : null
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
                    levelsShown={levelsShown}
                    setLevelsShown={setLevelsShown}
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
