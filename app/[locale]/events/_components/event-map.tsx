'use client';

import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';

type EventMapProps = {
    longitude: number;
    latitude: number;
};

export function EventMap({ longitude, latitude }: EventMapProps) {
    return (
        <div className="mt-3 overflow-hidden rounded-md border">
            <Map
                className="h-55 w-full"
                center={[longitude, latitude]}
                zoom={11}
                attributionControl={false}
            >
                <MapControls
                    position="bottom-right"
                    showZoom
                    showCompass
                    showFullscreen
                />
                <MapMarker longitude={longitude} latitude={latitude}>
                    <MarkerContent />
                </MapMarker>
            </Map>
        </div>
    );
}
