const express = require("express");
const app = express();

const user = require('./models/users');

user.sequelize.sync().then(() => {
    app.listen(3030, () => {
        console.log("======== app listen at 3030 ==========");
    });
});


