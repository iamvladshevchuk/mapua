import ContextMissingError from "@shared/errors/ContextMissingError";
import React, { useContext } from "react";

export default function useNonNullableContext<T>(context: React.Context<T>): NonNullable<T> {
    const result = useContext(context)
    if (result === null) throw new ContextMissingError()
    return result as NonNullable<T>
}