import MarkerController from "@markers/api/MarkerController";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export default function useMarkersQuery() {
    return useQuery<Interfaces.Marker[], AxiosError<Errors.Server>>('markers', () => MarkerController.index().then(addPopupToMarkers), { refetchOnWindowFocus: false })
}

/**
 * Popup stores a `mapboxgl.Popup` instance if it's open.
 * If popup isn't open, it's null.
 * It's made this way because mapboxgl doesn't store a list of popups in memory by itself.
 * So there's no other way to connect markers from the server with popups on the map.
 */
function addPopupToMarkers(markers: Resources.Marker[]): Interfaces.Marker[] {
    return markers.map(marker => ({...marker, popup: null}))
}