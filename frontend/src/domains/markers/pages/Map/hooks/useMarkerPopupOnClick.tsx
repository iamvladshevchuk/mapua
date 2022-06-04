import mapboxgl from "mapbox-gl"
import { useEffect } from "react"
import useMarkerPopup from "./useMarkerPopup"

export default function useMarkerPopupOnClick(map: mapboxgl.Map | undefined) {
    const popup = useMarkerPopup(map)

    useEffect(() => {
        const openPopupOnClick = () => {
            map!.on('click', 'places', (e) => {
                const feature = e.features?.[0] as any as GeoJSON.Feature<GeoJSON.Point, Interfaces.Marker>

                if (!feature)
                    return

                popup.open(feature.properties)
            })
        }

        map?.on('load', openPopupOnClick)

        return () => {
            map?.off('load', openPopupOnClick)
        }
    }, [map])

    return popup.state
}