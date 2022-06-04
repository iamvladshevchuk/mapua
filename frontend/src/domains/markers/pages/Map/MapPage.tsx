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
      <div 
        className={` 
          absolute 
          p-4 
          bottom-0 lg:top-0 lg:bottom-auto
          left-0 lg:right-0 lg:left-auto
          w-full lg:w-1/5
          h-1/2 lg:h-screen 
        `}
      ><MarkerList /></div>
    </MapContext.Provider>
  )
}
  