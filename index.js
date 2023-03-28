const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//-------const cwd = process.cwd(); ----- I SHOULDN"T NEED THIS --- THIS CONNECTS TO WORKING DIRECTORY

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`SocialMedia API server running at http://localhost:${PORT}`)
    });
});








