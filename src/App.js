import { useEffect } from "react";
import { FeatureToggleExemplo } from "./components/FeatureToggleExemplo";
import { ABTestingExemplo } from "./components/ABTestingExemplo";
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";

const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log("Experiment Viewed", {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

export default function App() {

  var city = '';
  const getCurrentLocationData = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude
            let longitude =  position.coords.longitude

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key={your api}`)
            .then((res) => res.json())
            .then((parsed) => {
              var compound_code = parsed.plus_code.compound_code;
              city = compound_code.split(",")[1].trim()
            })
        })
    }   
  }

  getCurrentLocationData()

  useEffect(() => {
    fetch("https://cdn.growthbook.io/api/features/{your_api}")
      .then((res) => res.json())
      .then((parsed) => {
        console.log(parsed.features)
        growthbook.setFeatures(parsed.features);
      });

    growthbook.setAttributes({
      id: uuidv4(),
      company: "Freitas IT",
      city: city
    });
  }, []);

  return (
      <GrowthBookProvider growthbook={growthbook}>
        
        <div className="App">
          <header className="App-header">
              <FeatureToggleExemplo />
              <ABTestingExemplo />
          </header>
        </div>
        
      </GrowthBookProvider>
    );
}


