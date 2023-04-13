import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";

const MidPoint = () => {
  let locate = useLocation();
  console.log(
    "test for location lat & lon from a midpoint",
    locate.state[0].lat
  );

  // let locations=[];
  // locations.push(locate.state)

  // console.log("test for location lat &lon from midpoiny in locationsarray ",locations)

  // let locations = [
  //     { latitude: 40.748817, longitude: -73.985428 }, // New York City
  //     { latitude: 34.052235, longitude: -118.243683 }, // Los Angeles
  //     { latitude: 51.507351, longitude: -0.127758 } // London
  //   ];
  const mapRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
      });

      // Calculate the midpoint
      // const midpoint = getMidpoint(locations);
      const midpoint = getMidpoint(locate.state);

      // Add a marker for the midpoint
      const marker = new window.google.maps.Marker({
        position: midpoint,
        map: map,
        title: "Midpoint",
      });
      // Center the map on the midpoint
      map.setCenter(midpoint);
    }
  }, []);
  // }, [locations]);

  function getMidpoint(locations) {
    // function getMidpoint(locate) {
    //     console.log("test for location lat &lon from midpoiny in locationsarray ",typeof( parseFloat(locations[0].lat)),  parseFloat(locations[0].lat))
    //   let totalLatitude = 0;
    //   let totalLongitude = 0;

    //   for (let i = 0; i < locations.length; i++) {
    //   //   totalLatitude += locations[i].latitude;
    //   //   totalLongitude += locations[i].longitude;
    //   // }

    //   totalLatitude += parseFloat(locations[i].lat);
    //   totalLongitude +=  parseFloat(locations[i].long);

    // }

    //   const midpointLatitude = totalLatitude / locations.length;
    //   const midpointLongitude = totalLongitude / locations.length;

    let latitudes = locations.map(
      (location) => (parseFloat(location.lat) * Math.PI) / 180
    );
    let longitudes = locations.map(
      (location) => (parseFloat(location.long) * Math.PI) / 180
    );

    let avglatitude = latitudes.reduce((a, b) => a + b) / latitudes.length;
    let avglongitude = longitudes.reduce((a, b) => a + b) / longitudes.length;

    let midpointlatitude = (avglatitude * 180) / Math.PI;
    let midpointlongitude = (avglongitude * 180) / Math.PI;

    return { latitude: midpointlatitude, longitude: midpointlongitude };
  }

  //  let midpoint = getMidpoint(locations);
  let midpoint = getMidpoint(locate.state);
  console.log(`Midpoint: (${midpoint.latitude}, ${midpoint.longitude})`);

  return (
    <>
      <div>
        <div
          ref={mapRef}
          style={{ height: "400px", width: "100%", marginBottom: "20px" }}
        />
      </div>
    </>
  );
};

export default MidPoint;
