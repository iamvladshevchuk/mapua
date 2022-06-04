import useNonNullableContext from "@shared/hooks/useNonNullableContext";
import mapboxgl from "mapbox-gl";
import { createContext } from "react";

const MapContext = createContext<{ map: mapboxgl.Map | undefined } | null>(null)
const useMapContext = () => useNonNullableContext(MapContext)

export default MapContext
export { useMapContext };
