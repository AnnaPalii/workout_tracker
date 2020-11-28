const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html")); 
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html")); 
});

app.get("/api/workouts" , (req, res) => {
    db.Workout.find({})
      .then(data => {
          res.json(data)
      })
})

app.get("/api/workouts/range" , (req, res) => {
    db.Workout.find({})
      .then(data => {
          res.json(data)
      })
})

app.post("/api/workouts", (req, res) =>{
    db.Workout.create({})
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(({message}) => {
          console.log(message)
      })
})

app.put("/api/workouts/:id", (req, res)=> {
    db.Workout.update({_id: req.params.id},
        {
            $push: {exercises: req.body}
        }).then(dbUpdate => {
            res.send(dbUpdate)
        })
})

app.listen(3000, () => {
  console.log(`http://localhost:${3000}`,);
});
