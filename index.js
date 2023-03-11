const express = require('express');
const db = require('./config/connection');
//------------const routes = require('./routes'); -----------NEED TO CONNECT TO ROUTES FOLDER

//-------const cwd = process.cwd(); ----- I SHOULDN"T NEED THIS --- THIS CONNECTS TO WORKING DIRECTORY

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
//---------------app.use(routes); ---------------- DOESN"T EXIST YET

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`SocialMedia API server running on port ${PORT}!`)
    });
});








