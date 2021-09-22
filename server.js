
const express = require("express")
const path = require("path")
const notes = require("./db/db.json")
const fs = require("fs/promises")
const app = express()
const PORT = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
app.use(express.static('public'));
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// API end point to get notes from db.json
app.get("/api/notes", (req, res) => {
    console.log(`GET request for notes receieved`)
    res.json(notes)
})

app.post("/api/notes", (req, res) => {
    console.log(`POST request recieved to add notes`)

    // Prepare a response object to send back to the client
    let response;

    // Check if there is anything in the response body
    if (req.body && req.body.title) {
        response = {
            status: 'success',
            title: req.body,
            text: req.body,
        };
        res.json(`${response.title.title} note has been added!`);
    } else {
        res.json('Request error must enter a text and title');
    }

    // Log the response body to the console
    console.log(req.body);
})
//! I have no idea what I am doing

// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column



// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page



// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column




app.listen(PORT, () => console.log("Listening at http://localhost:" + PORT))