const express = require("express");
const app = express();
const db = require('./models');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3030;
app.use(express.json());
//routes
const routes = require("./routes/routs");
app.use("/foodbank/v1", routes);



// Log database config (consider removing in production)
console.log("Database config:", db.sequelize.config);

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection established successfully.');

        await db.sequelize.sync();
        console.log("Database & tables created!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

// Test route for database connection
app.get('/test-db', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        res.send('Database connection is OK');
    } catch (error) {
        res.status(500).send(`Database connection failed: ${error.message}`);
    }
});

startServer();
