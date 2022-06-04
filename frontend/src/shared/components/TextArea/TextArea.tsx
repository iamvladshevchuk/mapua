import React, { forwardRef } from "react"
import { FieldError } from "react-hook-form"

function TextArea({ id, name, label, description, placeholder, error, ...props }: Props, ref: React.Ref<HTMLDivElement>) {
    return (
        <div ref={ref}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="mt-1">
                <textarea
                    id={id}
                    name={name}
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder={placeholder}
                    defaultValue={''}
                    {...props}
                />
            </div>
            {description && (
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            )}
            {error && <p className="mt-1 text-red-500">{error.message}</p>}
        </div>
    )
}

export default forwardRef(TextArea)

interface Props extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    id: string
    name?: string
    label?: string
    description?: string
    placeholder?: string
    error?: FieldError
}