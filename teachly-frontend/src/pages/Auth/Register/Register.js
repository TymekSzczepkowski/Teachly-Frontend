import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import registerVerification from "../../../hooks/Auth/registerVerification";
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
  const emailVerifier = emailVerification(state, errorInfo, setErrorInfo);
  const { profileTypeVerifier, passwordVerifier, detailsVerifier } =
    registerVerification(alignment, setErrorInfo, errorInfo, state);

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const toBigLetter = (word) => {
    word = word[0].toUpperCase() + word.slice(1);
    return word;
  };

  const continueHandler = () => {
    if (step === 1) {
      if (profileTypeVerifier() && emailVerifier() && passwordVerifier()) {
        nextStep();
      }
    } else if (step === 2) {
      if (detailsVerifier()) {
        setState({
          ...state,
          firstName: toBigLetter(state.firstName),
          lastName: toBigLetter(state.lastName),
        });
        nextStep();
      }
    } else if (step === 3) {
      //send to backend
      nextStep();
    } else if (step === 4) {
      //mailing
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
        {step !== 4 && (
          <div>
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
          </div>
        )}
        {getStepContent(step)}
        <Stack direction='row' spacing={2} sx={{ my: 4, mb: 1 }}>
          {step !== 1 && step !== 4 && (
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
              continueHandler();
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
