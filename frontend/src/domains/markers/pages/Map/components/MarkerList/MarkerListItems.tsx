import { AxiosError } from "axios";
import { UseQueryResult } from "react-query";
import { useMapContext } from "../../contexts/map";
import useFilterMarkersByBounds from "../../hooks/useFilterMarkersByBounds";
import useMapBounds from "../../hooks/useMapBounds";
import MarkerListItem from "./MarkerListItem";

export default function MarkerListItems({ query }: Props ) {
    const { map } = useMapContext()
    const bounds = useMapBounds(map)
    const markers = useFilterMarkersByBounds(query.data, bounds)

    if (query.isLoading)
        return <p>Loading...</p>

    if (query.isError)
        return <p>Unexpected error: {query.error.response?.data?.message || query.error.message || "Unknown"}</p>

    if (!markers.length)
        return <p>No events in this region.</p>

    return (
        <div className="grid gap-2">
            {markers.map(marker => <MarkerListItem key={marker.id} {...marker} />)}
        </div>
    )
}

interface Props {
    query: UseQueryResult<Interfaces.Marker[], AxiosError<Errors.Server>>
}