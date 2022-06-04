export default function toLocalDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false
    })
}