import { Nav, Dropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react'

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

  return (
    <div
      className='border-right position-absolute d-flex flex-column justify-content-center align-items-center'
      id='sidebar'
      style={{ top: '45%', right: '7%', transform: 'translateX(50%)' }}
    >
      <div className='sidebar-heading font-monospace fw-bold fs-3'>
        Navigate
      </div>
      <Nav className='flex-column justify-content-center align-items-center'>
        <Dropdown className='w-100'>
          <Dropdown.Toggle
            variant='light'
            id='dropdown-starting-point'
            className='fw-medium fs-5'
            style={{ width: '160px' }}
          >
            Starting Point
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Action 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className='w-100 mt-1'>
          {' '}
          {/* mt-1 for margin-top */}
          <Dropdown.Toggle
            variant='light'
            id='dropdown-destination'
            className='fs-5 fw-medium'
            style={{ width: '160px' }}
          >
            Destination
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Action 1</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Action 2</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Action 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  )
}

export default Sidebar
