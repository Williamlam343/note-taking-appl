const express = require("express")
const { clog } = require('./middleware/clog');
const app = express()
const PORT = process.env.PORT || 8000;

app.use(clog)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.use(require("./routes"));


app.listen(PORT, () => console.log("Listening at http://localhost:" + PORT))