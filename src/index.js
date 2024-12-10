const express = require('express')
const v1Router = require("./v1/routes/workoutRoutes");
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use("/api/v1/workouts",v1Router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))