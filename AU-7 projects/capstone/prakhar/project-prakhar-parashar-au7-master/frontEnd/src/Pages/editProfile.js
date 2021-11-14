import React from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BasicInfo from '../Components/BasicInfo'
import WorkAndEducation from '../Components/WorkAndEducation'
import OtherDetails from '../Components/OtherDetails'
import axios from 'axios'
import './styles/editProfile.css'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Basic Info', 'Work and Education', 'Other Details'];
}

function getStepContent(stepIndex, getValuesFromBasicInfo, getValuesFromWorkAndEducation, getValuesFromOtherDetails) {
  switch (stepIndex) {
    case 0:
      return <BasicInfo getValues={getValuesFromBasicInfo}/>;
    case 1:
      return <WorkAndEducation getValues= {getValuesFromWorkAndEducation}/>;
    case 2:
      return <OtherDetails getValues={getValuesFromOtherDetails}/>;
    default:
      return ;
  }
}

export default function HorizontalLabelPositionBelowStepper() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const userId = useSelector(state => state.userReducer.user._id)
  const history = useHistory()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 
  

  const submitForm = () => {
    isLoading = true
    history.push("/home")
    
    axios({
      method : 'post',
      url : '/ProfileDetails',
      data : {
        userId : userId,
        basicInfoValues : basicInfoValues,
        workAndEducationValues : workAndEducationValues,
        otherDetailsValues : OtherDetailsValues
      }
    }).then((response) => {
     
    })
  }
 
  const [basicInfoValues, setBasicInfoValues] = React.useState({})
  const [workAndEducationValues, setWorkAndEducationValues] = React.useState({})
  const [OtherDetailsValues, setOtherDetailsValues] = React.useState({})
  let isLoading = false;

  const getValuesFromBasicInfo = (basicInfoValues) => {
    setBasicInfoValues(basicInfoValues)      
  }

  const getValuesFromWorkAndEducation = (workAndEducationValues) => {
    setWorkAndEducationValues(workAndEducationValues)      
  }

  const getValuesFromOtherDetails = (OtherDetailsValues) => {
    setOtherDetailsValues(OtherDetailsValues)      
  }
  
  




  return (

    <div className={classes.root} id="container">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div id="exceptStepper">
         {activeStep === steps.length ? (
           <div>
          <Typography style={{marginBottom:"100px"}} className={classes.instructions}>You're all set.<img src="https://img.icons8.com/dusk/64/000000/facebook-like.png"/> Good to go</Typography>
          <Button onClick={handleReset} variant="contained" color="primary">Reset</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Button onClick = {submitForm} variant="contained" color="primary">Submit</Button>
           </div>
         ) :
           
           
         
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, getValuesFromBasicInfo, getValuesFromWorkAndEducation, getValuesFromOtherDetails)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
         </div> }
        
      </div>
    </div>
  );
}
