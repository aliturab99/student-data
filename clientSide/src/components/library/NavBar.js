import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom';



function NavBar() {
  return (
    <div>
        <Box display={"flex"} margin={3} justifyContent={"space-around"}>
            <Typography color={"#505050"} fontWeight={700} fontSize={"1.7rem"}>
                Student Data
            </Typography>
            <Box>
                <Button style={{margin:"0 1rem"}} component={Link} to="/" variant='outlined'>Add Data</Button>
                <Button component={Link} variant='outlined' to="/data">Student Data</Button>
            </Box>
        </Box>
        <Divider />
    </div>
  )
}

export default NavBar