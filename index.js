const express = require("express");
const cors = require("cors");
const db = require("./configs/firebaseConfig")
const { collection, getDocs, setDoc, doc, addDoc, getDoc, deleteDoc } = require("firebase/firestore/lite");
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());









const studentsCollectionRef = collection(db, "students");

app.post("/api/students/add-data", async (req, res) => {
    try {
        const data = req.body.data
        data.forEach(async (student) => {
            try {
                const docRef = await addDoc(studentsCollectionRef, student);
                console.log('Student added to Firebase with ID:', docRef.id);
            } catch (error) {
                console.error('Error adding student to Firebase:', error);
            }
        });
        // const docRef = await addDoc(studentsCollectionRef, data);
        // console.log("Student added with ID: ", docRef.id);

        res.status(200).send({ msg: "Student added successfully", added: true });
    } catch (error) {
        console.error("Error adding student: ", error);
        res.status(500).send("Error adding student");
    }
});

//End Point to get the data
app.get("/api/students/get-data", async (req, res) => {
    try {
        const studentsSnapshot = await getDocs(studentsCollectionRef);
        const students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(students);
        res.status(200).json(students);
    } catch (error) {
        console.error("Error getting students: ", error);
        res.status(500).send("Error getting students");
    }
});

// Endpoint to update a student by ID
app.put("/api/students/update/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentRef = doc(studentsCollectionRef, studentId);

        const snapshot = await getDoc(studentRef);

        if (snapshot.exists()) {
            const existingData = snapshot.data();
            const updatedData = req.body;

            // Merge the updated data into the existing data only for provided fields
            const mergedData = { ...existingData, ...updatedData };

            await setDoc(studentRef, mergedData);

            console.log({ updated: true });
            res.status(200).send("Student updated successfully");
        } else {
            console.error("Student not found with ID: ", studentId);
            res.status(404).send("Student not found");
        }
    } catch (error) {
        console.error("Error updating student: ", error);
        res.status(500).send("Error updating student");
    }
});

app.delete("/api/students/delete/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentRef = doc(studentsCollectionRef, studentId);

        await deleteDoc(studentRef);

        console.log("Student deleted with ID: ", studentId);
        res.status(200).send({ deleted: true });
    } catch (error) {
        console.error("Error deleting student: ", error);
        res.status(500).send("Error deleting student");
    }
});





app.all("*", (req, res) => {
    res.sendFile('/clientSide/build/index.html')
});

app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ error: err.message });
    } else {
        next()
    }
})
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ error: err.message });
    } else {
        next()
    }
})





app.listen(5000, () => console.log("Server is running on Port 5000"));