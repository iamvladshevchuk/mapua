import React, { forwardRef } from "react"
import { FieldError } from "react-hook-form"

function Input({ id, name, label, placeholder, error, ...props }: Props, ref: React.Ref<HTMLDivElement>) {
    return (
        <div ref={ref}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type="text"
                name={name}
                id={id}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder={placeholder}
                {...props}
            />
            {error && <p className="mt-1 text-red-500">{error.message}</p>}
        </div>
    )
}

export default forwardRef(Input)

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: string
    name?: string
    label?: string
    placeholder?: string
    error?: FieldError
}