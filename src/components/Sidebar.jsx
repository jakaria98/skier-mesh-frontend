import { Nav, Dropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import WaypointsService from '../services/WaypointsService'

const Sidebar = ({
  selectSlopeOnMap,
  clearSlopesOnMap,
  waypoints,
  startingPoint,
  setStartingPoint,
  destination,
  setDestination,
}) => {
  const [paths, setPaths] = useState([])
  const [pathOnDisplay, setPathOnDisplay] = useState([])

  return (
    <Grid container spacing={1} >
      <Grid item xs={12}>
        <Typography variant='h4' component='h4' sx={{ m: 1 }}>
          Navigation
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl
          sx={{ minWidth: '100%', m: 1 }}
          md={6}
          xs={12}
          size='small'
        >
          <InputLabel id='demo-select-small-label'>Starting Point</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={startingPoint || ''}
            label={startingPoint ? startingPoint.name : ''}
            onChange={event => setStartingPoint(event.target.value)}
          >
            {waypoints.map(waypoint => (
              <MenuItem key={waypoint.id} value={waypoint}>
                <em>{waypoint.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl
          sx={{ minWidth: '100%', m: 1 }}
          md={6}
          xs={12}
          size='small'
        >
          <InputLabel id='demo-select-small-label'>Destination</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={destination || ''}
            label={destination ? destination.name : ''}
            onChange={event => setDestination(event.target.value)}
          >
            {waypoints.map(waypoint => (
              <MenuItem key={waypoint.id} value={waypoint}>
                <em>{waypoint.name}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button
          sx={{ m: 1 }}
          variant={startingPoint && destination ? 'contained' : 'disabled'}
          onClick={() => {
            WaypointsService.getAllPaths({
              startId: startingPoint._id,
              endId: destination._id,
            })
              .then(r => setPaths(r.data))
              .catch(error => console.log(error))
          }}
        >
          Submit
        </Button>
        <Button
          sx={{ m: 1 }}
          variant={startingPoint || destination ? 'outlined' : 'disabled'}
          onClick={() => {
            setStartingPoint(null)
            setDestination(null)
            clearSlopesOnMap()
          }}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  )
}

export default Sidebar
