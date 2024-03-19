import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ImageOverlay,
} from 'react-leaflet'

function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Skier Mesh</h2>
        <MapContainer
          center={[54.5, -53.5]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: '900px', width: '1200px' }}
          maxBounds={[
            [53, -57],
            [56, -50],
          ]}
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
            bounds={[
              [53, -57],
              [56, -50],
            ]}
            opacity={1}
          />
          <Marker position={[54.5, -53.5]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
