import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MultiStepForm from '../components/MultiStepForm';
import { Stack, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import ChooseDocument from '../components/ChooseDocument';
import GatherDocDetails from '../components/GatherDocDetails';
import '../styles/UploadDocument.css'
import UploadPDF from '../components/UploadPDF';
import SubmitPDF from '../components/SubmitPDF'
import { useNavigate } from "react-router-dom";
import { DOCUMENT_TYPES } from '../Constants'
import useAxios from '../hooks/UseAxios.hook'
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const ResumeQuestionaire = {
    q1: 'Number of years of relevant experience',
    q2: 'Document Name',
    q3: 'Reason for having your resume reviewed? Anything you want to highlight to reviewer (Job Shifting, wanted to upscale your resume.... etc.,)',
    q4: 'Give a brief description about your years of experience, industry, or skills. You can also talk about your achievements or previous job experiences.'
}

const LORQuestionaire = {
    q1: 'Number of years of relevant experience',
    q2: 'Document Name',
    q3: 'Give a brief description of your qualifications and attributes that make you suitable for the college or program you are applying to. This can include academic achievements, extracurricular activities, leadership qualities, and personal characteristics.',
    q4: 'Any comments or extras information that you would like to share with the expert?'
}

const CollegeEssayQuestionaire = {
    q1: 'Number of years of relevant experience',
    q2: 'Document Name',
    q3: `Share a personal story or experience that illustrates something meaningful about who you are, what you value, or what you've learned. This could be an event that shaped your character, a challenge you've overcome, or a significant achievement.`,
    q4: 'Any comments or extras information that you would like to share with the expert?'
}

const PRDQuestionaire = {
    q1: 'Number of years of relevant experience',
    q2: 'Document Name',
    q3: `Give a brief description of the product for which you are writing the Product Requirement Document`,
    q4: 'Any comments or extras information that you would like to share with the expert?'
}



function UploadDocument() {
    const numberOfSteps = 4
    const [activeStep, setActiveStep] = React.useState(0);
    const [docType, setDocType] = React.useState()
    const [yearsOfExperience, setYearsOfExperience] = React.useState('')
    const [docName, setDocName] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [extraInfo, setExtraInfo] = React.useState('')
    const [document, setDocument] = React.useState()
    const [documentCategory, setDocumentCategory] = React.useState([])
    const navigate = useNavigate();
    const { data, error, loading, setUrl, setBody, setMethod, setHeaders, url } = useAxios({
        url: '/domains',
        method: 'GET',
        autoFetch: true
    });
    const user = useSelector(state => state.user.user)
    const sendQuestionaire = () => {
        if (docType === DOCUMENT_TYPES.COL_APP.shortHand) {
            return CollegeEssayQuestionaire
        }
        if (docType === DOCUMENT_TYPES.LOR.shortHand) {
            return LORQuestionaire
        }
        if (docType === DOCUMENT_TYPES.RESUME.shortHand) {
            return ResumeQuestionaire
        }
        if (docType === DOCUMENT_TYPES.PRD.shortHand) {
            return PRDQuestionaire
        }

    }

    const clearDetails = () => {
        setYearsOfExperience('')
        setDocName('')
        setDesc('')
        setExtraInfo('')
        setDocument()
    }

    useEffect(() => {
        if (data && url === '/review') {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if(data && url === '/domains') {
            setDocumentCategory(data)
        }
    }, [data])

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        if (activeStep === numberOfSteps - 2) {
            setUrl('/review')
            setMethod('POST')
            setBody({
                "attachmentName": docName,
                "attachment": document?.url,
                "relevantExp": yearsOfExperience,
                "reasonForReview": extraInfo,
                "description": desc,
                "docType": docType
            })
            setHeaders({ 'Content-Type': 'application/json', authorization: "Bearer " + user.accessToken })
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const disableNext = () => {
        if (activeStep === 0 && !docType) {
            return true
        }
        if (activeStep === 1 && (!yearsOfExperience || !docName || !desc || !extraInfo)) {
            return true
        }

        if (activeStep === 2 && !document) {
            return true
        }

        return false
    }
    const isNextDisabled = disableNext()
    return (
        <>
            <Typography variant="h4" ml={5} mt={2} mb={2} sx={{ fontWeight: 'bold' }}>
                Upload Document
            </Typography>
            <Box m={5} >
                <Box component="section"
                    sx={{ border: '1px solid #E4E6EA', height: '100%' }}
                    className="add-padding"
                    pt={5} pb={5}
                >
                    {loading && url === '/domains' ? <CircularProgress color='secondary' size={100} /> :
                    
                        error && url === '/domains' ? <Alert severity="error">{error.response?.data}</Alert> :
                        <>
                        <Box p={3} sx={{ border: '1px solid #909090', height: '100%', minHeight: '40vh', minWidth: '50%' }} >
                        
                        <MultiStepForm numberOfSteps={numberOfSteps} activeStep={activeStep} />
                        {activeStep === 0 && <ChooseDocument 
                        setDocType={setDocType} docType={docType} 
                        documentCategories={documentCategory} clearDetails={clearDetails}
                        />}
                        {activeStep === 1 &&
                            <GatherDocDetails
                                yearsOfExperience={yearsOfExperience} setYearsOfExperience={setYearsOfExperience}
                                docName={docName} setDocName={setDocName}
                                desc={desc} setDesc={setDesc}
                                extraInfo={extraInfo} setExtraInfo={setExtraInfo}
                                questionsObj={sendQuestionaire()}
                            />
                        }
                        {activeStep === 2 && <UploadPDF
                            setDocument={setDocument}
                            document={document}
                            setUrl={setUrl}
                            setMethod={setMethod}
                            setBody={setBody}
                            setHeaders={setHeaders}
                            user={user}
                            data={data}
                            loading={loading}
                            error={error} url={url}
                        />}
                        {activeStep === 3 && <SubmitPDF />}
                        <Stack spacing={10} direction="row" mt={5} sx={{ justifyContent: 'center' }}>
                            {activeStep !== numberOfSteps - 1 ?
                                <>
                                    <Button sx={{ width: '15vw' }}
                                        variant="contained"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button sx={{ width: '15vw' }}
                                        variant="contained"
                                        disabled={isNextDisabled}
                                        onClick={handleNext}
                                    >
                                        {activeStep === numberOfSteps - 2 ? 'Submit' : 'Next'}
                                    </Button>
                                </> :
                                <Button sx={{ width: '15vw' }}
                                    variant="contained"
                                    disabled={isNextDisabled}
                                    onClick={() => navigate("/customer-home")}
                                >
                                    Done
                                </Button>
                            }
                        </Stack>


                    </Box>
                        </>
                    
                        
                    }
                    
                </Box>

            </Box>

        </>
    )
}

export default UploadDocument