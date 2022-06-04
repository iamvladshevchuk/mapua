import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import TextArea from "@components/TextArea/TextArea";
import { SubmitHandler, useForm } from "react-hook-form";

export default function StoreMarkerForm({ event, onSubmit }: Props) {
    const { handleSubmit, register, formState: { errors } } = useForm<Omit<Resources.Marker, "id">>()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <div>
                <h2>New marker</h2>
                <p className="mt-1">Markers allow to monitor events</p>
            </div>
            <input type="hidden" value={event.lngLat.lng} {...register("lng", { valueAsNumber: true })} />
            <input type="hidden" value={event.lngLat.lat} {...register("lat", { valueAsNumber: true })} />
            <Input 
                id="marker-name" 
                label="What did you saw" 
                placeholder="Briefly about the place or the event" 
                error={errors.name}
                {...register("name", { required: { value: true, message: 'Name is required' }, maxLength: { value: 50, message: "Please, use less than 50 characters" } })} />
            <TextArea 
                id="marker-description" 
                label="Additional details" 
                placeholder="Details that might be important to assess the situation" 
                error={errors.description}
                {...register("description", { maxLength: { value: 150, message: "Please, use less than 150 characters" } })} />
            <Button>Add</Button>
        </form>
    )
}

interface Props {
    event: mapboxgl.MapMouseEvent & mapboxgl.EventData
    onSubmit: SubmitHandler<Omit<Resources.Marker, "id">>
}