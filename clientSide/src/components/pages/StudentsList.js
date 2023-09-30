import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


function StudentsList() {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [studentData, setStudentData] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const [updatedStudentData, setUpdatedStudentData] = useState({
        name: null,
        age: null,
        nationality: null,
        city: null
    });


    const column = [
        "ID",
        "Name",
        "Age",
        "Gender",
        "Nationality",
        "Edit",
        "Delete",
    ]

    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.get("/api/students/get-data").then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])
    const handleClose = () => {
        setOpen(false);
        setStudentData(null)
    };

    const handleEdit = (row) => {
        setOpen(true);
        data.filter(student => {
            if (student.id == row.id) {
                setStudentData(student)
            }
        })
    }



    const updateStudentData = (studentId, updatedData) => {
        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, value]) => value !== null)
        );

        const mergedData = { ...studentData, ...filteredData };
        setData(null)
        setLoading(true)

        axios.put(`/api/students/update/${studentId}`, mergedData)
            .then(res => {
                setUpdated(true)
                axios.get("/api/students/get-data").then(res => {
                    setData(res.data)
                    setLoading(false)
                }).catch(error => {
                    setUpdated(false)
                    console.log(error)
                    setLoading(false)
                })
            })
            .catch(error => {
                console.error('Error updating student data:', error);
            });
    };


    const handleDelete = (row) => {
        setDeleting(true)
        axios.delete(`/api/students/delete/${row.id}`)
        .then(res => {
                setDeleting(false)
                setDeleted(true)
            })
            .catch(error => {
                setDeleting(false)
                setDeleted(false)
                console.error('Error deleting student:', error);
            });
    };


    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );



    console.log(studentData)
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <table className="table-container">
                <thead>
                    <tr>
                        {
                            column.map((property, index) => {
                                return (
                                    <th key={index}>
                                        {property}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map((row, rowIndex) => {
                            const desiredOrder = ['id', 'name', 'age', 'gender', 'nationality'];

                            return (
                                <tr key={rowIndex}>
                                    {desiredOrder.map((key, index) => (
                                        <td key={index}>
                                            {key === 'gender' ? (row[key] === 'M' ? 'Male' : 'Female') : row[key]}
                                        </td>
                                    ))}
                                    <td>
                                        <IconButton
                                            onClick={() => handleEdit(row)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton
                                            onClick={() => handleDelete(row)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })
                        : loading ? (
                            <Box display={"flex"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <CircularProgress />
                                <h3>
                                    Loading ...
                                </h3>
                            </Box>
                        ) : (
                            <tr>
                                <td colSpan={column.length}>No data</td>
                            </tr>
                        )}
                </tbody>

            </table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    {studentData && (
                        <>
                            <TextField
                                value={updatedStudentData.name !== null ? updatedStudentData.name : studentData.name}
                                onChange={(e) => setUpdatedStudentData({ ...updatedStudentData, name: e.target.value })}
                                margin="dense"
                                id="name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                value={updatedStudentData.age !== null ? updatedStudentData.age : studentData.age}
                                onChange={(e) => setUpdatedStudentData({ ...updatedStudentData, age: e.target.value })}
                                margin="dense"
                                id="age"
                                type="number"
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                value={updatedStudentData.nationality !== null ? updatedStudentData.nationality : studentData.nationality}
                                onChange={(e) => setUpdatedStudentData({ ...updatedStudentData, nationality: e.target.value })}
                                margin="dense"
                                id="nationality"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                value={updatedStudentData.city !== null ? updatedStudentData.city : studentData.city}
                                onChange={(e) => setUpdatedStudentData({ ...updatedStudentData, city: e.target.value })}
                                margin="dense"
                                id="city"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            updateStudentData(studentData.id, updatedStudentData);
                            handleClose();
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            {
                updated &&
                <Snackbar
                    open={updated}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message="User Updated"
                    action={action}
                />
            }
            {
                deleted && <Snackbar
                open={deleted}
                autoHideDuration={5000}
                onClose={handleClose}
                message="User Deleted"
                action={action}
            />
            }
            {
                deleting && <Snackbar
                open={deleting}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Deleting"
                action={action}
            />
            }
        </Box>
    )
}

export default StudentsList