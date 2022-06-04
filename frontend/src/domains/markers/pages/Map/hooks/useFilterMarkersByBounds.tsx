import { useMemo } from "react";

export default function useFilterMarkersByBounds(original: Interfaces.Marker[] | undefined, bounds: mapboxgl.LngLatBounds | undefined): Interfaces.Marker[] {        
    const filtered = useMemo(() => original?.filter(marker => {
        if (!bounds) return true;

        return marker.lat < bounds.getNorth()
            && marker.lat > bounds.getSouth()
            && marker.lng > bounds.getWest()
            && marker.lng < bounds.getEast();
    }), [original, bounds])

    if (typeof(filtered) === "undefined")
        return []

    return filtered
}