const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();

// const routes = require('./routes/auth.routes');

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
app.use(cors);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



// app.get("/", (req, res) => {
//     // res.json({ message: "Welcome to application." });
//     app.use(express.static(path.join('../frontend/build')));
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});






const db = require("./models");
require('./routes/auth.routes')(app);

db.mongoose
  .connect(process.env.MONGODB_URI || `mongodb+srv://admin:admin@bookstore.ixyku.mongodb.net/omadatek_db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  
  app.use('/uploads', express.static(path.join('uploads')));

