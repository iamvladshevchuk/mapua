import mapboxgl from "mapbox-gl"
import { useRef } from "react"
import { createRoot } from 'react-dom/client'
import { useQueryClient } from "react-query"
import MarkerPopup from "../components/MarkerPopup/MarkerPopup"


export default function useMarkerPopup(map: mapboxgl.Map | undefined) {
    const query = useHandleMarkerQuery()
    const state = useRef<Interfaces.MarkerPopup.State>({ visible: false })

    const open = (marker: Interfaces.Marker) => {
        const div = document.createElement("div")

        const popup = new mapboxgl.Popup()
            .setLngLat([marker.lng, marker.lat])
            .setMaxWidth("300px")
            .setDOMContent(div)
            .addTo(map!)

        state.current = { visible: true, marker }
        
        popup.on('close', () => {
            state.current = { visible: false }
            query.clearPopupFromMarkers()
        })

        map!.flyTo({ 
            center: [marker.lng, marker.lat],
            speed: .4
        })

        query.connectPopupToMarker(popup, marker)

        createRoot(div)
            .render(<MarkerPopup {...marker} />)
    }

    const clear = () => {
        query.getPopups().forEach(popup => popup.remove())
    }

    return {
        state,
        open,
        clear
    }
}

function useHandleMarkerQuery() {
    const queryClient = useQueryClient()

    const connectPopupToMarker = (popup: mapboxgl.Popup, marker: Interfaces.Marker) => {
        queryClient.setQueryData<Interfaces.Marker[]>('markers', 
            old => old?.map(item => {
                if (item.id !== marker.id)
                    return item

                return { ...item, popup }
            }) || []
        )
    }

    const clearPopupFromMarkers = () => {
        queryClient.setQueryData<Interfaces.Marker[]>('markers', 
            old => old?.map(item => (
                { ...item, popup: null }
            )) || []
        )
    }

    const getPopups = () => {
        return queryClient
            .getQueryData<Interfaces.Marker[]>('markers')!.map(marker => marker.popup)
            .filter(popup => popup !== null) as mapboxgl.Popup[]
    }

    return {
        connectPopupToMarker,
        clearPopupFromMarkers,
        getPopups
    }
}