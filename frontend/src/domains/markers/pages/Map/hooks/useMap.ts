import useMapbox from "./useMapbox";
import useMarkerPopupOnClick from "./useMarkerPopupOnClick";
import useStoreMarkerFormOnClick from "./useStoreMarkerFormOnClick";

export default function useMap(container: React.RefObject<HTMLDivElement | null>, initial: Interfaces.Map.Initial, markers?: Interfaces.Marker[]) {
    const map = useMapbox(container, initial, markers)
    const marker = useMarkerPopupOnClick(map)
    useStoreMarkerFormOnClick(map, marker)
    return map
}