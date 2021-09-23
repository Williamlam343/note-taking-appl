const router = require("express").Router()
const fs = require("fs/promises")

// ** GET method Route
router.get("/notes", async (req, res) => {

    await fs.readFile("./db/db.json", "utf8").then((data) => res.json(JSON.parse(data)))
})

// ** POST method ROUTE
// API end point to get notes from db.json
router.post("/notes", async (req, res) => {

    let newNotes = {
        ...req.body,
        id: Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1),
    };
    const data = await fs.readFile("./db/db.json", "utf8")
    // parse data db.json
    const parsedNotes = JSON.parse(data)

    // add new notes to db.json
    parsedNotes.push(newNotes)

    // stringify notes to be saved
    const noteString = JSON.stringify(parsedNotes, null, 4)

    // saving files to db.json with stringified newNotes
    await fs.writeFile("./db/db.json", noteString)

    res.json("Successfully added note")
})


//**  DELETE method ROUTE
router.delete("/notes/:id", async (req, res) => {

    // Check if there is anything in the response body
    const data = await fs.readFile("./db/db.json", "utf8")
    // parse data db.json
    const parsedNotes = JSON.parse(data)

    //filter notes by id
    const filteredNote = parsedNotes.filter((note) => note.id !== req.params.id)
    // stringify notes to be saved
    const noteString = JSON.stringify(filteredNote)

    // saving files to db.json with stringified newNotes
    fs.writeFile("./db/db.json", noteString)


    res.json(`Note deleted successfully`)

})

module.exports = router