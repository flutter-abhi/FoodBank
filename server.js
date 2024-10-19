const express = require("express");
const app = express();

const db = require('./models'); // Import the db object

console.log("Starting server...");
console.log("Database config:", db.sequelize.config);

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log("Database & tables created!");
        app.listen(3030, () => {
            console.log("======== app listening at 3030 ==========");
        });
    })
    .catch((error) => {
        console.error('Unable to create tables:', error);
    });

// Add a test route to check database connection
app.get('/test-db', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        res.send('Database connection is OK');
    } catch (error) {
        res.status(500).send('Database connection failed: ' + error.message);
    }
});



