import { useState, useCallback, createElement } from "react";
import Map, {
  Marker,
  NavigationControl,
  ViewStateChangeEvent,
  MapMouseEvent,
  Source,
  Layer,
} from "react-map-gl/mapbox";
import type { GeoJSONSourceSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@tanstack/react-query";
import communityConfig from "@/config/communityConfig";
import { getMapboxToken } from "@/lib/supabaseClient";
import { MapPin } from "lucide-react";

export interface Pin {
  id: string | number;
  lat: number;
  lng: number;
  title?: string;
  color?: string;
  icon?: React.ReactNode;
}

export interface CC_MapProps {
  pins?: Pin[];
  interactive?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
  onPinClick?: (pin: Pin) => void;
  height?: string;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  initialLat?: number;
  initialLng?: number;
  className?: string;
  outlineGeoJson?: GeoJSONSourceSpecification["data"];
}

// The community outline is built with createElement instead of JSX on
// purpose. In AI Studio's dev preview, its source tagger adds a `ref` and a
// `data-tsd-source` prop to every JSX component, and react-map-gl copies all
// props into the Mapbox style spec, which Mapbox rejects ("prohibited for ref
// layers"). createElement calls aren't tagged. Published builds aren't affected.
const OUTLINE_SOURCE_ID = "community-outline";

const renderOutline = (data: GeoJSONSourceSpecification["data"]) => [
  createElement(Source, {
    key: OUTLINE_SOURCE_ID,
    id: OUTLINE_SOURCE_ID,
    type: "geojson",
    data,
  }),
  // Subtle red fill
  createElement(Layer, {
    key: "outline-fill",
    id: "outline-fill",
    source: OUTLINE_SOURCE_ID,
    type: "fill",
    paint: { "fill-color": "#ff4d4f", "fill-opacity": 0.05 },
  }),
  // White base line for striped effect
  createElement(Layer, {
    key: "outline-base",
    id: "outline-base",
    source: OUTLINE_SOURCE_ID,
    type: "line",
    paint: { "line-color": "#ffffff", "line-width": 4 },
  }),
  // Red dashed line on top
  createElement(Layer, {
    key: "outline-dash",
    id: "outline-dash",
    source: OUTLINE_SOURCE_ID,
    type: "line",
    paint: {
      "line-color": "#ff4d4f",
      "line-width": 4,
      "line-dasharray": [1.5, 1.5],
    },
  }),
];

export const CC_Map = ({
  pins = [],
  interactive = true,
  onMapClick,
  onPinClick,
  height = "400px",
  zoom = 16,
  pitch = 0,
  bearing = 0,
  initialLat,
  initialLng,
  className = "",
  outlineGeoJson,
}: CC_MapProps) => {
  const { data: mapboxToken, isPending } = useQuery({
    queryKey: ["mapbox-token"],
    queryFn: () => getMapboxToken(),
    staleTime: Infinity,
  });
  const defaultLat = initialLat ?? communityConfig.coordinates.lat;
  const defaultLng = initialLng ?? communityConfig.coordinates.lng;

  const [viewState, setViewState] = useState({
    longitude: defaultLng,
    latitude: defaultLat,
    zoom: zoom,
    pitch: pitch,
    bearing: bearing,
  });

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (onMapClick && event.lngLat) {
        onMapClick(event.lngLat.lat, event.lngLat.lng);
      }
    },
    [onMapClick],
  );

  if (isPending) {
    return (
      <div
        className={`bg-light-gray animate-pulse rounded-xl ${className}`}
        style={{ height }}
        aria-hidden="true"
      />
    );
  }

  if (!mapboxToken) {
    return (
      <div
        className={`bg-light-gray flex flex-col items-center justify-center text-center p-6 border border-border rounded-xl ${className}`}
        style={{ height }}
      >
        <MapPin className="w-12 h-12 text-primary/40 mb-3" />
        <h3 className="text-lg font-display font-bold text-bark">Map Component Ready</h3>
        <p className="text-sm text-text-light max-w-sm mt-2">
          Please add your Mapbox Public Token to the configuration to render the interactive map.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl overflow-hidden border border-border relative ${className}`}
      style={{ height }}
    >
      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={mapboxToken}
        onClick={handleMapClick}
        interactive={interactive}
        dragPan={interactive}
        scrollZoom={interactive}
      >
        {outlineGeoJson && renderOutline(outlineGeoJson)}

        {interactive && <NavigationControl position="bottom-right" />}

        {pins.map((pin) => (
          <Marker
            key={pin.id}
            longitude={pin.lng}
            latitude={pin.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              if (onPinClick) onPinClick(pin);
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform relative group">
              {pin.icon ? (
                pin.icon
              ) : (
                <MapPin
                  className="w-8 h-8 drop-shadow-md"
                  style={{
                    color: pin.color || communityConfig.brandColors.primary,
                  }}
                />
              )}
              {pin.title && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded shadow-xs text-xs font-bold text-bark whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {pin.title}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};
