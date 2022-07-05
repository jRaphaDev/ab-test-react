import { useFeature, IfFeatureEnabled, useGrowthBook, useExperiment } from "@growthbook/growthbook-react";

export function ABTestingExemplo() {

    const { value } = useExperiment({
        key: "percente-abtesting",
        variations: ["Variation A", "Variation B"],
    });
    

    return (
        <div>
            {value}
            <hr />
        </div>  
    )

    
}