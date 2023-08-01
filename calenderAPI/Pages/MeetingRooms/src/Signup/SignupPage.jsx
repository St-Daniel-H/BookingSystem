import APIs from "../Backend/backend";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ErrorAlert from "../Alerts/ErrorAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import { useSnackbar } from "notistack";
import colors from "../scss/SCSSVariables";
import "./Signup.scss";
const steps = ["Create An Account", "Create Company Profile"];
//forms
import CreateAccountSignup from "./CreateAccount";
import CreateCompany from "./CreateCompany";

function Signup() {
  //snackbars
  const { enqueueSnackbar } = useSnackbar();
  function handleSnackBar(error) {
    enqueueSnackbar(error, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "error",
    });
  }
  function handleSnackBarSuccess() {
    enqueueSnackbar("Signup Successful", {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "success",
    });
  }
  //turn true when the user finishes the form.

  //user form
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //company form
  const [companyData, setCompanyData] = useState({
    Name: "",
    email: "",
    logo: null,
  });
  const navigateTo = useNavigate();
  //forms
  const Forms = [
    <CreateAccountSignup state={userData} setState={setUserData} key="0" />,
    <CreateCompany state={companyData} setState={setCompanyData} key="1" />,
  ];

  // Define a helper function to handle API calls
  async function callApi(endpoint, data) {
    try {
      const response = await fetch(APIs.apiLink + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      const isJsonResponse =
        contentType && contentType.includes("application/json");

      if (!response.ok) {
        // If the response is JSON, parse the error message from the JSON data
        if (isJsonResponse) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.detail);
        } else {
          // If the response is not JSON, throw a generic error
          throw new Error("Error: " + response.status);
        }
      }

      // If the response is JSON, parse the data
      if (isJsonResponse) {
        return await response.json();
      } else {
        // If the response is not JSON, return the entire response object
        return response;
      }
    } catch (error) {
      throw new Error("Signup failed: " + error.message);
    }
  }

  async function signUp() {
    try {
      if (
        companyData.Name == "" ||
        companyData.Email == "" ||
        userData.firtName == "" ||
        userData.lastName == "" ||
        userData.email == "" ||
        userData.password == ""
      ) {
        throw new Error("Please fill all information");
      }
      //company data
      const companyData2 = new FormData();
      companyData2.append("Name", companyData.Name);
      companyData2.append("email", companyData.email);
      if (companyData.logo != null) {
        companyData2.append("logo", companyData.logo[0]);
      }

      //authontication data
      const authData2 = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      };

      //we make sure user is valid first.
      const response = await fetch(APIs.apiLink + "/api/Auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: authData2.firstName,
          lastName: authData2.lastName,
          email: authData2.email,
          password: authData2.password,
        }),
      });
        if (response.ok) {
           
        //user verified.
        //make a company
            const data = await response.json();
            const authId = data.userId;
            console.log(data);
            console.log(authId);
        const compnayResponse = await fetch(APIs.apiLink + "/api/Company", {
          method: "POST",
          body: companyData2,
        });
        const companyRes = await compnayResponse.json(); // Parse the response data

        if (companyRes.companyId !== null) {
          console.log(companyData);
        } else {
          console.error("Failed to create company:", companyRes.json());
          throw new Error("something went wrong creating the company");
        }

        const companyId = companyRes.companyId;

        const userData2 = {
          name: userData.firstName + " " + userData.lastName,
          email: userData.email,
          password: userData.password,
          role: "Admin",
          companyId: companyId,
          authId: authId
        };
        const userResponse = callApi("/api/User", userData2);
        console.log(userResponse);
        if (userResponse) {
          handleSnackBarSuccess();
          navigateTo("/login");
        }
      } else {
        const errorResponse = await response.json();
        console.log("Signup failed:", errorResponse.detail);
        throw new Error(errorResponse.detail);
      }
    } catch (error) {
      console.log(error.message);
      handleSnackBar(error.message);
      //setValid(false);
    }
  }
  //for stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    console.log(userData);
  };
  //end of stepper
  return (
    <div id="SignupPage">
      {/* <div id="rightOfSignUp">
        <div>
          <h1>
            Join <span>MeetingRooms</span> Today!
          </h1>
        </div>
      </div> */}
      <div id="leftSideOfSignup">
        <section id="welcome">
          {" "}
          <h1>Sign up to MeetingRooms today</h1>
        </section>

        <div id="container">
          {/* 
             stepper 
             */}
          <Box className="stepper" sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step
                  sx={{
                    "&.MuiStepLabel-labelContainer": {
                      color: "common.white",
                    },
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "primary.main", // circle color (COMPLETED)
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white", // Just text label (COMPLETED)
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "primary.main", // circle color (ACTIVE)
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white", // Just text label (ACTIVE)
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "common.white", // circle's number (ACTIVE)
                    },
                  }}
                  key={label}
                  completed={completed[index]}
                >
                  <StepButton color="#fafafa" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={signUp}>Submit</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography component="span" sx={{ mt: 2, mb: 1, py: 1 }}>
                    {Forms[activeStep]}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <>
                          {completedSteps() === totalSteps() - 1 ? (
                            <Button onClick={signUp}>Submit</Button>
                          ) : (
                            <Button onClick={handleComplete}>
                              Complete Step
                            </Button>
                          )}
                        </>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
          {/* 
            end of stepper!!!!!!!!!!!!!!!!!!!
                     */}
        </div>
        <section id="login">
          {" "}
          <h2>
            Already have an account? <a href="./login">click here</a>
          </h2>
        </section>
      </div>
    </div>
  );
}

export default Signup;
