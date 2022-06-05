import useMarkersQuery from "@markers/hooks/useMarkersQuery"
import MarkerListItems from "./MarkerListItems"
import { HiX, HiMenuAlt2 } from 'react-icons/hi'
import { useState } from "react"
import { twMerge } from 'tailwind-merge'

export default function MarkerList() {
    const query = useMarkersQuery()
    const [visible, setVisible] = useState(true)

    return (
        <div className={twMerge(` 
            absolute 
            p-4 
            bottom-0 lg:top-0 lg:bottom-auto
            left-0 lg:right-0 lg:left-auto
            w-full lg:w-1/3 xl:w-1/4 2xl:w-1/5
            h-1/2 lg:h-screen 
        `, (!visible && `
            w-[84px] lg:w-[84px]
            h-[84px] lg:h-[84px]
            left-1/2 lg:left-auto
            -translate-x-1/2 lg:translate-x-0
        `))}>
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
        </div>
    )
}