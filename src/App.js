import logo from './logo.svg';
import './App.css';
import Mapir from "mapir-react-component";
import { useEffect, useState } from 'react';
import polyline from 'google-polyline';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIwMjRiZDBlMDA3MjFlMzQwMDkwNmZmZDE4OTE1YWZjZTZkZjQwNmI4NDc2NmU2YjczY2RkZTRiN2UxNzRlMjgzNmU5YjQ5ZmZiYTYzZmEyIn0.eyJhdWQiOiIxODM0OCIsImp0aSI6IjIwMjRiZDBlMDA3MjFlMzQwMDkwNmZmZDE4OTE1YWZjZTZkZjQwNmI4NDc2NmU2YjczY2RkZTRiN2UxNzRlMjgzNmU5YjQ5ZmZiYTYzZmEyIiwiaWF0IjoxNjU1MDQ2MzAyLCJuYmYiOjE2NTUwNDYzMDIsImV4cCI6MTY1NzYzODMwMiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.QcgDk2vIwE8ia3iwmv7ZZIc4--4_nGbJ-ViTCtrdJp8AEX9BaGXJp-MJvUrDUAAJRP5GQX-SiaD2m33bCtYQX3LgedZmxcB43gmJgoa5TH2TzfWgzWfvNHzWn9EJy4sAF0nZk9TL_MYk79bDCTssy_YU32oA-EPXYaUzzeGLZecuXb5jexzk1eD59pi6370yaoGWIucmN_P33sSEBSTH9yANM7FdhUFA5zDBUbkumsy9Xb5OlPzlL4i01YzK9E7o3IW6dF74AX7EVmYXN5WoNo5WgMnC8_G0BYSc8yT6Wf-yaB6PC_dMCglVZJLcCjeKKAxFm4rTPhxvPZ26c7AbOw', //Mapir access token
        'Mapir-SDK': 'reactjs'
      }
    }

  }
});

function App2() {
  const [center, setCenter] = useState([
    51.6660, // lng
    32.6539, // lat
  ]);

  const [geojson, setGeojson] = useState({});
  const [coords, setCoords] = useState({
    firstLng: center[0],
    firstLat: center[1],
    // 32.663346, 51.701991 (ahmad abad)
    // 32.680286, 51.652407 (bahonar)
    secondLng: "51.652407",
    secondLat: "32.680286",
  })

  useEffect(() => {
    fetch(
      "https://map.ir/routes/route/v1/driving/" +
      coords.firstLng +
      "," +
      coords.firstLat +
      ";" +
      coords.secondLng +
      "," +
      coords.secondLat,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIwMjRiZDBlMDA3MjFlMzQwMDkwNmZmZDE4OTE1YWZjZTZkZjQwNmI4NDc2NmU2YjczY2RkZTRiN2UxNzRlMjgzNmU5YjQ5ZmZiYTYzZmEyIn0.eyJhdWQiOiIxODM0OCIsImp0aSI6IjIwMjRiZDBlMDA3MjFlMzQwMDkwNmZmZDE4OTE1YWZjZTZkZjQwNmI4NDc2NmU2YjczY2RkZTRiN2UxNzRlMjgzNmU5YjQ5ZmZiYTYzZmEyIiwiaWF0IjoxNjU1MDQ2MzAyLCJuYmYiOjE2NTUwNDYzMDIsImV4cCI6MTY1NzYzODMwMiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.QcgDk2vIwE8ia3iwmv7ZZIc4--4_nGbJ-ViTCtrdJp8AEX9BaGXJp-MJvUrDUAAJRP5GQX-SiaD2m33bCtYQX3LgedZmxcB43gmJgoa5TH2TzfWgzWfvNHzWn9EJy4sAF0nZk9TL_MYk79bDCTssy_YU32oA-EPXYaUzzeGLZecuXb5jexzk1eD59pi6370yaoGWIucmN_P33sSEBSTH9yANM7FdhUFA5zDBUbkumsy9Xb5OlPzlL4i01YzK9E7o3IW6dF74AX7EVmYXN5WoNo5WgMnC8_G0BYSc8yT6Wf-yaB6PC_dMCglVZJLcCjeKKAxFm4rTPhxvPZ26c7AbOw', //Mapir access token
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        var decodeResult = polyline.decode(result.routes[0].geometry);
        var reverseLatLon = decodeResult.map(items => items.reverse());
        var geojsonpoint = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: reverseLatLon
              }
            }
          ]
        };
        setGeojson(geojsonpoint);
      });
  }, []);

  return (
    <>
      <div className="absolute !h-screen !w-screen pointer-events-none z-[90]" >
        <div className="absolute flex justify-center items-center !w-screen !h-screen pointer-events-none">
          <button className="p-4 bg-blue-500 text-white font-bold">^</button>
        </div>
        <div className="absolute flex justify-end items-end !w-screen !h-screen pointer-events-none">
          <div className="relative pointer-events-auto mb-20 mr-6">
            <button className="bg-red-500 p-2 text-white font-bold" onClick={async () => {
              const queryResult = await navigator.permissions.query({ name: 'geolocation' });
              if (queryResult.state === 'granted') {
                console.log(queryResult)
                navigator.geolocation.getCurrentPosition(
                  (e) => {
                    console.log('1. revealPosition:', e);
                    setCenter([e.coords.longitude, e.coords.latitude]);
                  },
                  (e) => console.log('1. positionDenied:', e)
                );

              } else if (queryResult.state === 'prompt') {
                // await navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
                navigator.geolocation.getCurrentPosition(
                  (e) => {
                    console.log('revealPosition:', e);
                    setCenter([e.coords.longitude, e.coords.latitude]);
                  },
                  (e) => console.log('positionDenied:', e)
                );
              }
            }}
            >
              F
            </button>
          </div>
        </div>
      </div >
      <div className="absolute flex !w-screen !h-screen">
        <Mapir
          Map={Map}
          center={center}
          onDragEnd={(e) => { console.log(e) }}
        >
          {/* <Mapir.GeoJSONLayer
            data={geojson}
            linePaint={{ "line-color": "red", "line-width": 5 }}
          /> */}
        </Mapir>
      </div>
    </>
  )
}

export default App2;
