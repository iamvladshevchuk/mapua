import MapboxLanguage from '@mapbox/mapbox-gl-language';
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { useEffect, useState } from "react";

export default function useMapbox(container: React.RefObject<HTMLElement | null>, initial: Interfaces.Map.Initial, markers: Interfaces.Marker[] | undefined): mapboxgl.Map | undefined {
  const [map, setMap] = useState<mapboxgl.Map>()

  useEffect(() => {
    if (!container.current)
      return

    const mapboxglMap = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initial.lng, initial.lat],
      zoom: initial.zoom
    })

    mapboxglMap.addControl(new MapboxLanguage({
      defaultLanguage: 'en'
    }))
    
    setMap(mapboxglMap)

    return () => {
      mapboxglMap.remove()
    }
  }, [])

  usePopulateMarkers(map, markers)

  return map
}

function usePopulateMarkers(map: mapboxgl.Map | undefined, markers: Interfaces.Marker[] | undefined): mapboxgl.GeoJSONSource | undefined {
  const source = useSource(map)
  useSyncMarkers(map, markers)
  return source
}

function useSource(map: mapboxgl.Map | undefined) {
  const [source, setSource] = useState<mapboxgl.GeoJSONSource>()

  useEffect(() => {
    const createSource = () => {
      map!.addSource('places', { type: 'geojson', data: {
        type: 'FeatureCollection',
        features: []
      }})

      map!.addLayer({
          id: 'places',
          type: 'circle',
          source: 'places',
          paint: {
              'circle-radius': 8,
              'circle-stroke-width': 2,
              'circle-color': '#1a1a1a',
              'circle-stroke-color': '#fff'
          },
          filter: ['==', '$type', 'Point']
      })

      setSource(map!.getSource('places') as GeoJSONSource)
    }

    map?.on('load', createSource)

    return () => {
      map?.off('load', createSource)
    }
  }, [map])

  return source
}

function useSyncMarkers(
  map: mapboxgl.Map | undefined, 
  markers: Interfaces.Marker[] | undefined
) {
  useEffect(() => {
    const sync = () => {
      const source = map!.getSource('places') as GeoJSONSource
      source?.setData(getFeaturesFromMarkers(markers || []))
    }
    
    map?.isStyleLoaded()
      ? sync()
      : map?.on('load', sync)

    return () => {
      map?.off('load', sync)
    }
  }, [map, markers])
}

function getFeaturesFromMarkers(markers:Interfaces.Marker[]): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
      type: 'FeatureCollection',
      features: markers?.map(markerToFeature) || []
  }
}

function markerToFeature(marker: Interfaces.Marker): GeoJSON.Feature<GeoJSON.Point, Interfaces.Marker> {
  return {
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [marker.lng, marker.lat]
      },
      properties: { ...marker, popup: null } // prevent `Uncaught TypeError: cyclic object value`
  }
}