import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Success from "./Success";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import { validatePassword } from "../../../hooks/Auth/passwordVerification";
import { validateEmail } from "../../../hooks/Auth/emailVerification";
import { validateProfileType, validateRepeatPassowrd, validateDetails } from "../../../hooks/Auth/registerVerification";
import { Container, Paper, Typography, Button, Stepper, Step, StepLabel, Stack, Box, Link as LinkUI } from "@mui/material/";

const API_URL = process.env.REACT_APP_API_URL;
function Register() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [profileTypeSelection, setProfileTypeSelection] = useState("");
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

  async function continueHandler() {
    if (step === 1) {
      if (validateProfileType(profileTypeSelection) === "" && validateEmail(state.email) === "" && validatePassword(state.password) === "" && validateRepeatPassowrd(state.password, state.repeatPassword) === "") {
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
      //first name i last name nie jest uwzględnione w rejetracji
      try {
        const response = await axios.post(
          API_URL + `accounts/users/`,
          {
            first_name: state.firstName,
            last_name: state.lastName,
            sex: state.sex,
            email: state.email,
            password: state.password,
            re_password: state.repeatPassword,
            avatar: state.image,
            type: state.profileType,
            country: state.country,
            county: state.region,
            city: state.city,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        nextStep();
      } catch (exception) {}
    }
  }
  useEffect(() => {
    auth && navigate("/");
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 1:
        return <UserDetails nextStep={nextStep} state={state} setState={setState} step={step} alignment={profileTypeSelection} setAlignment={setProfileTypeSelection} inputMessage={inputMessage} setInputMessage={setInputMessage} />;
      case 2:
        return <PersonalDetails nextStep={nextStep} previousStep={previousStep} setState={setState} state={state} step={step} inputMessage={inputMessage} setInputMessage={setInputMessage} />;
      case 3:
        return <Confirmation nextStep={nextStep} previousStep={previousStep} step={step} state={state} />;
      case 4:
        return <Success state={state} />;
      default:
        return <div>error</div>;
    }
  }

  useEffect(() => {
    if (click) {
      setInputMessage({
        ...inputMessage,
        profileTypeMessage: validateProfileType(profileTypeSelection),
        emailMessage: validateEmail(state.email),
        passwordMessage: validatePassword(state.password),
        repeatPasswordMessage: validateRepeatPassowrd(state.password, state.repeatPassword),
      });
    }
  }, [click, state]);

  const steps = ["Dane rejestracji", "Dane osobowe", "Weryfikacja danych"];

  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper elevation={1} sx={{ my: { xs: 13, md: 16 }, p: { xs: 3.5, md: 3 } }}>
        {step !== 4 && (
          <Box>
            <Typography sx={{ fontWeight: 400 }} variant='h4' align='center' data-testid='signup'>
              Zarejestruj się
            </Typography>
            <Stepper activeStep={step - 1} sx={{ pt: 3, pb: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        {getStepContent(step)}
        <Stack direction='row' spacing={2} sx={{ my: 4, mb: 1 }}>
          {step !== 1 && step !== 4 && (
            <Button
              sx={{ p: 1 }}
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
              sx={{ p: 1 }}
              data-testid='continue-button'
              fullWidth
              variant='contained'
              onClick={(e) => {
                e.preventDefault();
                continueHandler();
                setClick(true);
                if (step === 2)
                  if (state.firstName !== "" && state.lastName !== "")
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
            <LinkUI color='secondary' component={Link} to={"/login"} variant='body2'>
              Masz już konto? Zaloguj się
            </LinkUI>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
