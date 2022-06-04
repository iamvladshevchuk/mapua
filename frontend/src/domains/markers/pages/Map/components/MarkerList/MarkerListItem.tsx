import toLocalDate from "@helpers/toLocalDate";
import { useMapContext } from "../../contexts/map";
import useMarkerPopup from "../../hooks/useMarkerPopup";

export default function MarkerListItem(marker: Interfaces.Marker) {
    const { map } = useMapContext()
    const popup = useMarkerPopup(map)

    const handleClick = () => {
        popup.clear()
        popup.open(marker)
    }

    return (
        <div className={`border overflow-auto border-solid p-4 rounded grid gap-2 cursor-pointer hover:bg-gray-100 ${marker.popup && "bg-gray-100"}`} onClick={handleClick}>
            <div>
                <h2>{marker.name}</h2>
                <p className="text-gray-900">{marker.description}</p>
            </div>
            <small className="text-gray-600 text-xs">{toLocalDate(marker.date)}</small>
            <small className="text-gray-600 text-xs">{marker.lng.toFixed(5)}, {marker.lat.toFixed(5)}</small>
        </div>
    )
}