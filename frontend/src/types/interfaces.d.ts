declare module Interfaces {
    module Map {
        interface Initial {
            lng: number
            lat: number
            zoom: number
        }
    }

    module MarkerPopup {
        interface State {
            visible: boolean
            marker?: Resources.Marker
        }
    }

    interface Marker extends Resources.Marker {
        popup: mapboxgl.Popup | null
    }
}