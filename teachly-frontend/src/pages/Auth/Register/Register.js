import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
function Register() {
  const [step, setStep] = useState(1);
  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  return (
    <div>
      {(() => {
        switch (step) {
          case 1:
            return <UserDetails nextStep={nextStep} step={step} />;
          case 2:
            return (
              <PersonalDetails
                nextStep={nextStep}
                previousStep={previousStep}
                step={step}
              />
            );
          case 3:
            return (
              <Confirmation
                nextStep={nextStep}
                previousStep={previousStep}
                step={step}
              />
            );
          case 4:
            return <Success />;
          default:
            return <div>Poszła srać</div>;
        }
      })()}
    </div>
  );
}

export default Register;
