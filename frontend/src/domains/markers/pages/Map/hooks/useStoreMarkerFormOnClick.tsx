import MarkerController from "@markers/api/MarkerController";
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import StoreMarkerForm from "../components/StoreMarkerForm/StoreMarkerForm";
import whenMobile from "@root/shared/helpers/whenMobile";

/**
 * Opens a popup on map with a form to store a marker when clicked by user
 */
export default function useStoreMarkerFormOnClick(map: mapboxgl.Map | undefined, marker: React.MutableRefObject<Interfaces.MarkerPopup.State>) {
  const queryClient = useQueryClient()
  const store = useMutation(MarkerController.store, {
    onSuccess: (marker: Resources.Marker) => {
      queryClient.setQueryData<Interfaces.Marker[]>('markers', old => [
        { ...marker, popup: null }, ...old || []
      ])
    }
  })

  useEffect(() => {
    const openFormOnClick = () => {
      map!.on('click', function (e) {
        if (marker.current.visible)
          return

        const form = document.createElement("div")
        
        const popup = new mapboxgl.Popup({ className: "mapboxgl-popup-form" })
          .setLngLat(e.lngLat)
          .setDOMContent(form)
          .setMaxWidth("300px")
          .addTo(map!)

        map!.flyTo({ 
          center: e.lngLat,
          speed: .4,
          offset: whenMobile(() => getFlyOffset()) || [0, 0]
        })

        toggleMapInteractions(map!, popup)

        const handleSubmit: SubmitHandler<Omit<Resources.Marker, "id">> = values => {
          store.mutate(values)
          popup.remove()
        }

        createRoot(form)
          .render(<StoreMarkerForm event={e} onSubmit={handleSubmit} />)
      })
    }

    map?.on('load', openFormOnClick)

    return () => {
      map?.off('load', openFormOnClick)
    }
  }, [map])
}

function getFlyOffset(): [number, number] {
  const topOffset = 115
  return [0, - (window.innerHeight / 2) + topOffset]
}

function toggleMapInteractions(map: mapboxgl.Map, popup: mapboxgl.Popup) {
  let disabled = false
        
  whenMobile(() => {
    disableInteractions(map)
    disabled = true
  })

  popup.on('close', () => {
    if (!disabled)
      return
      
    enableInteractions(map)
  })
}

function disableInteractions(map: mapboxgl.Map) {
  map.boxZoom.disable()
  map.scrollZoom.disable()
  map.dragPan.disable()
  map.dragRotate.disable()
  map.keyboard.disable()
  map.doubleClickZoom.disable()
  map.touchZoomRotate.disable()
}

function enableInteractions(map: mapboxgl.Map) {
  map.boxZoom.enable()
  map.scrollZoom.enable()
  map.dragPan.enable()
  map.dragRotate.enable()
  map.keyboard.enable()
  map.doubleClickZoom.enable()
  map.touchZoomRotate.enable()
}