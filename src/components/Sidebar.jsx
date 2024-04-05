import { Nav, Dropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import WaypointsService from '../services/WaypointsService'
import PathDetail from '../pages/sub/PathDetail'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'

const Sidebar = ({
  selectSlopesOnMap,
  clearSlopesOnMap,
  waypoints,
  startingPoint,
  setStartingPoint,
  destination,
  setDestination,
  levelsShown,
  setLevelsShown,
}) => {
  const [paths, setPaths] = useState([])
  const [numOnDisplay, setNumOnDisplay] = useState(0)
  const [pathsTitle, setPathsTitle] = useState('')

  useEffect(() => {
    console.log(typeof paths)
    const modifiedPathArray = []
    if (!Array.isArray(paths)) {
      const pathArray0 = paths.slopes
      for (let i = 0; i < pathArray0.length; i++) {
        modifiedPathArray.push(' ')
        modifiedPathArray.push(pathArray0[i])
      }
    }
    if (paths && paths[numOnDisplay]) {
      selectSlopesOnMap(
        paths[numOnDisplay].filter((item, index) => index % 2 == 1)
      )
    } else {
      selectSlopesOnMap(
        modifiedPathArray.filter((item, index) => index % 2 == 1)
      )
    }
  }, [paths, numOnDisplay])

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={12}>
        <Typography variant='h4' component='h4' sx={{ m: 1 }}>
          Navigation
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ minWidth: '100%' }} md={6} xs={12} size='small'>
          <InputLabel id='demo-select-small-label'>Starting Point</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={startingPoint || ''}
            label={startingPoint ? startingPoint.name : ''}
            onChange={event => setStartingPoint(event.target.value)}
          >
            {waypoints.map(waypoint => (
              <MenuItem key={waypoint._id} value={waypoint}>
                <em>{waypoint.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl sx={{ minWidth: '100%' }} md={6} xs={12} size='small'>
          <InputLabel id='demo-select-small-label'>Destination</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={destination || ''}
            label={destination ? destination.name : ''}
            onChange={event => setDestination(event.target.value)}
          >
            {waypoints.map(waypoint => (
              <MenuItem key={waypoint._id} value={waypoint}>
                <em>{waypoint.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ml:1}}>
          Levels:
          <Checkbox
            checked={levelsShown[0]}
            sx={{
              color: 'blue',
              '&.Mui-checked': {
                color: 'blue',
              },
            }}
            onChange={() => {
                setLevelsShown(levelsShown.map((s, i) => (i == 0) ? !s : s ))
            }}
          />
          <Checkbox
            checked={levelsShown[1]}
            sx={{
              color: 'red',
              '&.Mui-checked': {
                color: 'red',
              },
            }}
            onChange={() => {
                setLevelsShown(levelsShown.map((s, i) => (i == 1) ? !s : s ))
            }}
          />
          <Checkbox
            checked={levelsShown[2]}
            sx={{
              color: 'black',
              '&.Mui-checked': {
                color: 'black',
              },
            }}
            onChange={() => {
                setLevelsShown(levelsShown.map((s, i) => (i == 2) ? !s : s ))
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getAllPaths({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setPathsTitle(`Showing paths from ${startingPoint.name} to ${destination.name}`)
                setNumOnDisplay(0)  
                setPaths(r.data)
              })
              .catch(error => console.log(error))
          }}
        >
          All Paths
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getShortestPath({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setNumOnDisplay(0)
                setPaths(r.data)
              })
              .catch(error => console.log(error))
          }}
        >
          Shortest Path
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getShortestPath({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setNumOnDisplay(0)
                setPaths(r.data)
              })
              .catch(error => console.log(error))
          }}
        >
          Fastest Path
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getShortestPath({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setNumOnDisplay(0)
                setPaths(r.data)
              })
              .catch(error => console.log(error))
          }}
        >
          Easiest Path
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getAllPaths({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setNumOnDisplay(0)
                setPaths(r.data.sort((a, b) => a.lifts.length - b.lifts.length).slice(0, 1))
              })
              .catch(error => console.log(error))
          }}
        >
          Minimum Lift Usage
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            clearSlopesOnMap()
            WaypointsService.getShortestPath({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => {
                setPaths(r.data)
                setNumOnDisplay(0)
              })
              .catch(error => console.log(error))
          }}
        >
          Most Scenic
        </Button>
        <Button
          sx={{ m: 1, ml: 0 }}
          variant={startingPoint || destination ? 'outlined' : 'disabled'}
          onClick={() => {
            setStartingPoint(null)
            setDestination(null)
            clearSlopesOnMap()
            setPaths([])
          }}
        >
          Clear
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{m:1}}>{pathsTitle}</Box>
          <Tabs
            key={0}
            value={numOnDisplay}
            onChange={(e, tabIndex) => {
              clearSlopesOnMap()
              setNumOnDisplay(tabIndex)
            }}
            variant='scrollable'
            scrollButtons='auto'
          >
            {paths && Array.isArray(paths) ? (
              paths.map((path, index) => (
                <Tab label={`Path ${index}`} key={path._id} />
              ))
            ) : (
              <Tab label={`Path`} />
            )}
          </Tabs>
        </Box>
        {paths && Array.isArray(paths) ? (
          paths.map(
            (path, index) =>
              numOnDisplay == index && <PathDetail path={path} key={path._id} />
          )
        ) : (
          <PathDetail path={paths} />
        )}
      </Grid>
    </Grid>
  )
}

export default Sidebar
