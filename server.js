const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./Routes/auth");
const docRoutes = require("./Routes/doctors");
const sessionsRoutes = require("./Routes/sessions");
const usersRoutes = require("./Routes/users");

const app = express();
app.use(bodyParser())
app.use(cors())
app.use(cookieParser())

app.use(express.json())

// Express APIs
app.use('/api/auth', authRoutes)
app.use('/api/doctors', docRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/sessions', sessionsRoutes)

// DB Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`your app is listening at port ${process.env.PORT}`);
});
