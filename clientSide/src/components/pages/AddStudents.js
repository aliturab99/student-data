import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';
import axios from 'axios';



function AddStudents() {


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
          complete: (result) => {
            // Result.data will contain parsed CSV data
            console.log('Parsed CSV data:', result.data);
            axios.post("/api/students/add-data", {data: result.data} ).then(
                res => console.log(res)
            ).catch(
                error => console.log(error)
            )
            // Send the parsed data to Firebase
            // sendToFirebase(result.data);
          },
          header: true, // Set this to true if your CSV has headers
        });
      };


    return (
        <Box display={"flex"} justifyContent={'center'} alignItems={"center"} height={"80vh"}>
            <Box boxShadow={5} padding={5}>
                <Typography fontSize={"1.2rem"} color={"#606060"} fontWeight={700}>
                    Upload CSV File
                </Typography>
                <Button component="label" variant="contained"  startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput  onChange={handleFileUpload} type="file" />
                </Button>
            </Box>
        </Box>
    )
}

export default AddStudents