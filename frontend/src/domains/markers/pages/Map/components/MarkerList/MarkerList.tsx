import useMarkersQuery from "@markers/hooks/useMarkersQuery"
import MarkerListItems from "./MarkerListItems"

export default function MarkerList() {
    const query = useMarkersQuery()

    return (
        <div className="bg-white shadow overflow-y-auto rounded-lg h-full p-4">
            <h1 className="mb-4">Region Events</h1>
            <MarkerListItems query={query} />
        </div>
    )
}