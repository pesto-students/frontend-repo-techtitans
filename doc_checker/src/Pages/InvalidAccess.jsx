import React from 'react'
import BasicModal from '../components/Modal';
import { useDispatch, } from 'react-redux';
import { setUser } from '../redux/slicer';
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InvalidAccess() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const moveToLogin = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.clear()
        dispatch(setUser({}))
        navigate('/login')
    }

  return (
    <BasicModal
        showModal={true}
        modalTitle={"You do not have the rights to access the page."}
        modalActions={(
            <Stack direction="row" sx={{margin: 'auto'}}>
                    <Button
                        variant="contained"
                        onClick={moveToLogin}
                        >
                            Login
                    </Button>
                </Stack>
        )}
        />
  )
}

export default InvalidAccess