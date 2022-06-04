import { debounce } from "@helpers/debounce";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

export default function useMapBounds(map: mapboxgl.Map | undefined) {
    const [bounds, setBounds] = useState<mapboxgl.LngLatBounds>()

    useEffect(() => {
        const refreshBounds = debounce(() => setBounds(map!.getBounds()), 400)

        map?.on('move', refreshBounds)

        return () => {
            map?.off('move', refreshBounds)
        }
    }, [map])

    return bounds
}