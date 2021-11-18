import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Stack } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';

const steps = [
  {
    label: 'Mathematics',
    test: 22,
    exam: 33,
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'English',
    test: 11,
    exam: 18,
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Physics',
    test: 12,
    exam: 45,
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function ReportGrade() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={() => setActiveStep(index)}
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last Subject</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>

                <Grid container justifyContent="center" >
                    <Grid item xs={5} sm={6} md={4} >
                        <Box p={1} >
                        
                        <Paper sx={{minWidth: 80}}>
                            <Typography textAlign="center">Test</Typography>
                            <Box  display="flex" p={1} justifyContent="space-around">
                               
                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: red[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">{step.test}</Typography>
                                
                                </Avatar>

                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: green[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">40</Typography>
                                
                                </Avatar>
                            </Box>
    
                        </Paper>
                            
                        </Box>

                    </Grid>

                    <Grid item xs={6} sm={6} md={4} >
                        <Box p={1} >
                        
                        <Paper sx={{minWidth: 80}}>
                            <Typography textAlign="center">Exam</Typography>
                            <Box  display="flex" p={1} justifyContent="space-around">
                               
                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: red[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">{step.exam}</Typography>
                                
                                </Avatar>

                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: green[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">60</Typography>
                                
                                </Avatar>
                            </Box>
    
                        </Paper>
                            
                        </Box>

                    </Grid>

                    <Grid item xs={12} sm={12} md={4} >
                        <Box p={1} >
                        
                        <Paper sx={{minWidth: 80}}>
                            <Typography textAlign="center">Total</Typography>
                            <Box  display="flex" p={1} justifyContent="space-around">
                               
                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: blue[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">{step.exam + step.test}</Typography>
                                
                                </Avatar>

                                <Avatar sx={{height: 24, width: 24}} sx={{backgroundColor: green[600]}}>
                                <Typography fontWeight={900} sx={{color: "white"}} variant="body2">100</Typography>
                                
                                </Avatar>
                            </Box>
    
                        </Paper>
                            
                        </Box>

                    </Grid>

                    <Grid xs={12} >
                        <Box p={1} display="flex" >
                            <Stack sx={{mr: 2}} >
                                <Typography >Grade:</Typography>
                                <Typography >Remark:</Typography>
                            </Stack>

                            <Stack >
                                <Typography >A</Typography>
                                <Typography  >EXCELLENT</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
             
             
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next Subject'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Prev
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
