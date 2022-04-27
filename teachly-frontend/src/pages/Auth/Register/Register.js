import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Success from "./Success";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import { validatePassword } from "../../../hooks/Auth/passwordVerification";
import { validateEmail } from "../../../hooks/Auth/emailVerification";
import { validateProfileType, validateRepeatPassowrd, validateDetails } from "../../../hooks/Auth/registerVerification";
import { Container, Paper, Typography, Button, Stepper, Step, StepLabel, Stack, Box, Link as LinkUI } from "@mui/material/";

function Register() {
  const [click, setClick] = useState(false);
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
  const [inputMessage, setInputMessage] = useState({
    profileTypeMessage: "",
    emailMessage: "",
    passwordMessage: "",
    repeatPasswordMessage: "",
    detailsMessage: "",
    imageMessage: "",
  });

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
  function continueHandler() {
    if (step === 1) {
      if (validateProfileType(alignment) === "" && validateEmail(state.email) === "" && validatePassword(state.password) === "" && validateRepeatPassowrd(state.password, state.repeatPassword) === "") {
        nextStep();
      }
    } else if (step === 2) {
      setInputMessage({
        ...inputMessage,
        detailsMessage: validateDetails(state.firstName, state.lastName, state.sex, state.country, state.region, state.city, state.image),
      });
      if (validateDetails(state.firstName, state.lastName, state.sex, state.country, state.region, state.city, state.image) === "") {
        nextStep();
      }
    } else if (step === 3) {
      //send to backend
      nextStep();
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <UserDetails nextStep={nextStep} state={state} setState={setState} step={step} alignment={alignment} setAlignment={setAlignment} inputMessage={inputMessage} setInputMessage={setInputMessage} />;
      case 2:
        return <PersonalDetails nextStep={nextStep} previousStep={previousStep} setState={setState} state={state} step={step} inputMessage={inputMessage} setInputMessage={setInputMessage} />;
      case 3:
        return <Confirmation nextStep={nextStep} previousStep={previousStep} step={step} state={state} />;
      case 4:
        return <Success />;
      default:
        return <div>error</div>;
    }
  }

  useEffect(() => {
    if (click) {
      setInputMessage({
        ...inputMessage,
        profileTypeMessage: validateProfileType(alignment),
        emailMessage: validateEmail(state.email),
        passwordMessage: validatePassword(state.password),
        repeatPasswordMessage: validateRepeatPassowrd(state.password, state.repeatPassword),
      });
    }
  }, [click, state]);

  const steps = ["Dane rejestracji", "Dane osobowe", "Weryfikacja danych"];

  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        {step !== 4 && (
          <div>
            <Typography variant='h4' align='center' data-testid='zarejestruj'>
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
          {step !== 4 && (
            <Button
              fullWidth
              variant='contained'
              onClick={(e) => {
                e.preventDefault();
                continueHandler();
                setClick(true);
                if (step === 2)
                  setState({
                    ...state,
                    firstName: toBigLetter(state.firstName),
                    lastName: toBigLetter(state.lastName),
                  });
              }}>
              Dalej
            </Button>
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          {step === 1 && (
            <Link to='/login' data-testid='link'>
              <LinkUI variant='body2'>Masz już konto? Zaloguj się</LinkUI>
            </Link>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
