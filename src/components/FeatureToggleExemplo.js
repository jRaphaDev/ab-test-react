import { useFeature, IfFeatureEnabled } from "@growthbook/growthbook-react";

export function FeatureToggleExemplo() {

    const featureName = "always-true";
    var feature = useFeature(featureName);

    var featureOnConditions = (feature.on) ? <p>FeatureToggle Conditions 'always-true' is TRUE</p> : <p>FeatureToggle Conditions 'always-true' is FALSE</p>

    return (
        <div>
            <div>
                <IfFeatureEnabled feature={featureName}>
                    <p>FeatureToggle Component 'always-true' is TRUE</p>
                </IfFeatureEnabled>
            </div>
            <hr />
            <div>
                { featureOnConditions }
            </div>
            <hr />
        </div>
    )

    
}