import useMarkersQuery from "@markers/hooks/useMarkersQuery"
import MarkerListItems from "./MarkerListItems"
import { HiX, HiMenuAlt2 } from 'react-icons/hi'
import { useState } from "react"
import { twMerge } from 'tailwind-merge'

export default function MarkerList() {
    const query = useMarkersQuery()
    const [visible, setVisible] = useState(true)

    return (
        <div className="relative h-full">
            <button className={twMerge(`
                absolute 
                bottom-0
                left-1/2
                -translate-x-1/2
                lg:top-[4px] 
                lg:right-[4px] 
                lg:translate-x-0
                lg:left-auto
                bg-white 
                rounded-full 
                w-[48px] h-[48px] 
                flex 
                justify-center 
                items-center
            `, (visible && `bg-transparent`))} onClick={() => setVisible(old => !old)}>{visible ? <HiX /> : <HiMenuAlt2 />}</button>
            <div className={"bg-white shadow overflow-y-auto rounded-lg h-full pb-[48px] p-4 " + (!visible && "hidden")}>
                <h1 className="mb-4">Region Events</h1>
                <MarkerListItems query={query} />
            </div>
        </div>
       
    )
}