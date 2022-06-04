import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

if (!process.env.REACT_APP_MAPBOX)
    throw "You didn't specify REACT_APP_MAPBOX (public key to access Mapbox) in .env file"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX