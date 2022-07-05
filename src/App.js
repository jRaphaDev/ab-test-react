import { useEffect } from "react";
import { FeatureToggleExemplo } from "./components/FeatureToggleExemplo";
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
  useEffect(() => {
    fetch("https://cdn.growthbook.io/api/features/<*** your api key ***>")
      .then((res) => res.json())
      .then((parsed) => {
        console.log(parsed.features)
        growthbook.setFeatures(parsed.features);
      });

    // Set user attributes for targeting (from cookie, auth system, etc.)
    growthbook.setAttributes({
      id: "123",
      company: "Freitas IT",
    });
  }, []);

  return (
      <GrowthBookProvider growthbook={growthbook}>
        <div className="App">
          <header className="App-header">
              <FeatureToggleExemplo />
          </header>
        </div>
      </GrowthBookProvider>
    );
}


