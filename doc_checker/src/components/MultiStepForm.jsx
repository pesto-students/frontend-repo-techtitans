import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



export default function MultiStepForm({numberOfSteps, activeStep}) {
    const populateSteps = () => {
        let steps = []
        for(let i=0; i<numberOfSteps; i++) {
          const stepProps = {};
          const labelProps = {};
          steps.push (
            <Step key={i} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        }
        return steps
    }

    const steps = populateSteps()

  return (
    <Box sx={{ width: '100%' }}>
         <Stepper activeStep={activeStep}>
            {steps.map(step => step)}
         </Stepper>
    </Box>
  );
}