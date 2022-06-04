import useMarkersQuery from "@markers/hooks/useMarkersQuery";
import { useRef } from "react";
import MarkerList from "./components/MarkerList/MarkerList";
import MapContext from "./contexts/map";
import useMap from "./hooks/useMap";

export default function MapPage() {
  const query = useMarkersQuery()
  const container = useRef<HTMLDivElement | null>(null)
  const map = useMap(container, { lng: 33.8, lat: 48.52, zoom: 5.5 }, query.data)

  return (
    <MapContext.Provider value={{ map }}>
      <div className="h-screen" ref={container} />
      <MarkerList />
    </MapContext.Provider>
  )
}
  