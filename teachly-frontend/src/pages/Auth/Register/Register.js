import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import emailVerification from "../../../hooks/Auth/emailVerification";
import {
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Link,
  Box,
} from "@mui/material/";

import Success from "./Success";
function Register() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    profileType: "Uczeń",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    secondName: "",
    gender: "",
    iamge: "",
    country: "",
    region: "",
    city: "",
  });

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const emailVerifier = emailVerification(state);

  const passwordVerifier = () => {
    if (state.password === "") {
      console.log("Proszę wpisać hasło");
      return false;
    } else if (state.repeatPassword === "") {
      console.log("Proszę wpisać powtórzenie hasła");
      return false;
    } else if (state.password !== state.repeatPassword) {
      console.log("\nHasło nie pasuje: Spróbuj ponownie...");
      return false;
    }
  };

  const dataVerifier = () => {
    if (
      (state.firstName === "" || state.secondName === "",
      state.gender === "",
      state.country === "",
      state.region === "",
      state.city === "")
    )
      console.log("Proszę uzupełnić dane");
  };

  function getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={nextStep}
            state={state}
            setState={setState}
            step={step}
          />
        );
      case 2:
        return (
          <PersonalDetails
            nextStep={nextStep}
            previousStep={previousStep}
            setState={setState}
            state={state}
            step={step}
          />
        );
      case 3:
        return (
          <Confirmation
            nextStep={nextStep}
            previousStep={previousStep}
            step={step}
            state={state}
          />
        );
      case 4:
        return <Success />;
      default:
        return <div>error</div>;
    }
  }

  const steps = ["Dane rejestracji", "Dane osobowe", "Weryfikacja danych"];

  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        <Typography variant='h4' align='center'>
          Zarejestruj się
        </Typography>
        <Stepper activeStep={step - 1} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(step)}
        <Stack direction='row' spacing={2} sx={{ my: 4, mb: 1 }}>
          {step !== 1 && (
            <Button
              fullWidth
              color='inherit'
              variant='text'
              onClick={() => {
                previousStep();
              }}>
              Powrót
            </Button>
          )}
          <Button
            fullWidth
            variant='contained'
            onClick={(e) => {
              e.preventDefault();
              // emailVerifier();
              // passwordVerifier();
              if (step === 1) {
                if (emailVerifier() && passwordVerifier()) {
                  nextStep();
                }
              }
            }}>
            Kontynuuj
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          {step === 1 && (
            <Link href='/login' variant='body2'>
              Masz już konto? Zaloguj się
            </Link>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
