import APIs from "../Backend/backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Signup.scss"
const steps = ['Create An Account', 'Create Company Profile'];
//forms
import CreateAccountSignup from "./CreateAccount";
import CreateCompany from "./CreateCompany";
function Signup() {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const [firstName, setFirstName] = useState("");
    //const [lastName, setLastName] = useState("");
    const navigateTo = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    //forms
    // Function to get the form data from CreateCompany component
    const getCompanyFormData = () => {
        // Assuming Forms[1] corresponds to CreateCompany component
        return Forms[1].props.getFormData();
    };
    const Forms = [<CreateAccountSignup key="0" />, <CreateCompany key="1" getCompanyFormData={getCompanyFormData} />];
    // Example usage in the main component
    const handleFormSubmit = () => {
        // Get form data from CreateCompany component
        const companyFormData = getCompanyFormData();
        console.log(companyFormData);
        // You can now use the companyFormData object as needed.
    };
    async function signUp(event) {
        event.preventDefault();
        if (password == "" || email == "" || firstName == "" || lastName == "") {
            setErrorMessage("Please fill all the information");
            return;
        }
        const response = await fetch(APIs.apiLink + "/api/Auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const data = await response;
            console.log(data);
            alert("Signup successful");
            navigateTo("/");
        } else {
            const errorResponse = await response.json();
            console.log("Signup failed:", errorResponse.detail);
            setErrorMessage(errorResponse.detail);
            // Handle the error response here, e.g., show an error message to the user
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
    };
    //end of stepper
    return (
        <div id="SignupPage">
        <div id="container">
            <h1>Signup</h1>
            <p>{errorMessage}</p>
            {/* 
             stepper 
             */}
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                                    <Typography component="span" sx={{ mt: 2, mb: 1, py: 1 }}>
                                        {Forms[activeStep]}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                            Step {activeStep + 1} already completed
                                        </Typography>
                                    ) : (
                                                <Button onClick={handleComplete}>
                                            {completedSteps() === totalSteps() - 1
                                                        ? 'Finish' 
                                                : 'Complete Step'}
                                        </Button>
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
        </div>
    )
        
}

export default Signup;