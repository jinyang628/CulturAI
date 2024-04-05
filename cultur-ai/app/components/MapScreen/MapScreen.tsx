import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerProps,
} from "@react-google-maps/api";

const containerStyle = {
  width: "350px",
  height: "400px",
};

export default function MapScreen() {
  // laod script for google map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDuF3Xw7uzo-32goIgLSVQzKQLtwOS4CFk",
  });

  if (!isLoaded) return <div>Loading....</div>;

  const center = {
    lat: 37.33939,
    lng: -121.89496,
  };

  const markers: MarkerProps[] = [
    {
      position: { lat: 37.3356, lng: -121.914 },
      label: {
        text: "Rosicrucian Egyptian Museum",
        color: "black",
        fontWeight: "bold",
      },
      zIndex: 1,
    },
    {
      position: { lat: 37.3183, lng: -121.9513 },
      label: {
        text: "Winchester Mystery House",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3384, lng: -121.8855 },
      label: {
        text: "Plaza de la Cultura",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3376, lng: -121.8856 },
      label: {
        text: "San Jose City Hall",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3199, lng: -121.9482 },
      label: {
        text: "Santana Row",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3257, lng: -121.8786 },
      label: {
        text: "Japanese Friendship Garden",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3362, lng: -121.8945 },
      label: {
        text: "San Pedro Square Market",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3317, lng: -121.8907 },
      label: {
        text: "Tech Interactive",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.3337, lng: -121.8896 },
      label: {
        text: "San Jose Museum of Art",
        color: "black",
        fontWeight: "bold",
      },
    },
    {
      position: { lat: 37.1755, lng: -121.8375 },
      label: {
        text: "?",
        color: "black",
        fontWeight: "bold",
      },
      icon: {
        url: "https://img.icons8.com/ios-glyphs/30/lock--v1.png",
        labelOrigin: new google.maps.Point(75, 32),
        size: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 32),
      },
    },
  ];

  const getMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        label={marker.label}
        icon={
          marker.icon
            ? marker.icon
            : {
                url: "https://img.icons8.com/color/35/region-code.png",
                labelOrigin: new google.maps.Point(75, 32),
                size: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
              }
        }
      />
    ));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="text-3xl font-bold">Around your neighbourhood</div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {getMarkers()}
      </GoogleMap>
      <div className="text-2xl font-bold">Clues to unlock locations:</div>
      <div className="stack">
        <div className="relative">
          <img
            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            className="rounded w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <p className="text-white text-xl font-bold px-5 text-center">
              The Ice Cream that reminds you of Mama
            </p>
          </div>
        </div>
        <img
          src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
          className="rounded"
        />
        <img
          src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
          className="rounded"
        />
      </div>
    </div>
  );
}
