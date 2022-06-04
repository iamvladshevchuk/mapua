import toLocalDate from "@helpers/toLocalDate"

export default function MarkerPopup({ name, description, date, lat, lng }: Interfaces.Marker) {
    return (
        <div className="grid gap-3">
            <div>
                <h2>{name}</h2>
            </div>
            {description && (
                <div>
                    <small className="text-gray-600">Description</small>
                    <p className="text-gray-900">{description}</p>
                </div>
            )}
            <div>
                <small className="text-gray-600">Date</small>
                <p className="text-gray-900">{toLocalDate(date)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <small className="text-gray-600">Longitude</small>
                    <p className="text-gray-900">{lng.toFixed(5)}</p>
                </div>
                <div>
                    <small className="text-gray-600">Latitude</small>
                    <p className="text-gray-900">{lat.toFixed(5)}</p>
                </div>
            </div>
        </div>
    )
}