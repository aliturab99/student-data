<<<<<<< Updated upstream
=======
const express = require("express");
const cors = require("cors");
const db = require("./configs/firebaseConfig")
const { collection, getDocs, setDoc } = require("firebase/firestore/lite");
const firebaseConfig = require('./configs/firebaseConfig');

const app = express();
app.use(express.json());
app.use(cors());

const studentsCollectionRef = collection(db, "students");

app.post("/add-data", async (req, res) => {
    try {
        const data = {
            rollNumber: "1abc",
            name: "Ali Turab",
            class: "Bs",
        };

        const docRef = await addDoc(studentsCollectionRef, data);
        console.log("Student added with ID: ", docRef.id);

        res.status(200).send("Student added successfully");
    } catch (error) {
        console.error("Error adding student: ", error);
        res.status(500).send("Error adding student");
    }
});

//End Point to get the data
app.get("/get-students-data", async (req, res) => {
    try {
        const studentsSnapshot = await getDocs(studentsCollectionRef);
        const students = studentsSnapshot.docs.map(doc => doc.data());
        console.log(students);
        res.status(200).json(students);
    } catch (error) {
        console.error("Error getting students: ", error);
        res.status(500).send("Error getting students");
    }
});

// Endpoint to update a student by ID
app.put("/update-student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentRef = doc(db, "students", studentId);

        const updatedData = req.body;

        await setDoc(studentRef, updatedData, { merge: true });
        console.log("Student updated with ID: ", studentId);

        res.status(200).send("Student updated successfully");
    } catch (error) {
        console.error("Error updating student: ", error);
        res.status(500).send("Error updating student");
    }
});

app.listen(5000, () => console.log("Server is running on Port 5000"));
>>>>>>> Stashed changes
