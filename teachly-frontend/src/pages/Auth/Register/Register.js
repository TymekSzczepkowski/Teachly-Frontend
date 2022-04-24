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
  const [alignment, setAlignment] = useState("");
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    profileType: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    sex: "",
    image: "",
    country: "",
    region: "",
    city: "",
  });
  const [errorInfo, setErrorInfo] = useState({
    profileTypeError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    detailsError: "",
  });

  const toBigLetter = (word) => {};

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const emailVerifier = emailVerification(state, errorInfo, setErrorInfo);

  const profileTypeVerifier = () => {
    if (alignment === "") {
      setErrorInfo({
        ...errorInfo,
        profileTypeError: "Proszę wybrać typ profilu",
      });
      return false;
    } else {
      return true;
    }
  };
  const passwordVerifier = () => {
    if (state.password === "") {
      setErrorInfo({ ...errorInfo, passwordError: "Proszę wpisać hasło" });
      return false;
    } else if (state.repeatPassword === "") {
      setErrorInfo({
        ...errorInfo,
        repeatPasswordError: "Powtórz hasło",
      });
      return false;
    } else if (state.password !== state.repeatPassword) {
      setErrorInfo({
        ...errorInfo,
        passwordError: "Hasła nie są takie same",
      });
      return false;
    } else
      setErrorInfo({
        ...errorInfo,
        repeatPasswordError: "",
        passwordError: "",
      });
    return true;
  };

  const detailsVerifier = () => {
    if (
      state.firstName === "" ||
      state.lastName === "" ||
      state.sex === "" ||
      state.country === "" ||
      state.region === "" ||
      state.city === "" ||
      state.image === ""
    ) {
      setErrorInfo({
        ...errorInfo,
        detailsError: "Wszystkie pola muszą zostać wypełnione",
      });
      return false;
    } else
      setErrorInfo({
        ...errorInfo,
        detailsError: "",
      });
    return true;
  };

  const conutineHandler = () => {
    if (step === 1) {
      if (profileTypeVerifier() && emailVerifier() && passwordVerifier()) {
        nextStep();
      }
    } else if (step === 2) {
      if (detailsVerifier()) {
        nextStep();
      }
    } else if (step === 3) {
      //send to backend
      nextStep();
    }
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
            alignment={alignment}
            setAlignment={setAlignment}
            errorInfo={errorInfo}
            setErrorInfo={setErrorInfo}
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
            errorInfo={errorInfo}
            setErrorInfo={setErrorInfo}
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
              conutineHandler();
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
