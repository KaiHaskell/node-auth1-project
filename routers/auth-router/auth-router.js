const router = require("express").Router();
const bcyrpt = require("bcryptjs");

//Add a user
router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcyrpt.hashSync(credentials.password, 8);

  credentials.password = hash;

  db.add(credentials)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not add a user to the table" });
    });
});

//Get a list of users
router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not retrieve users" });
    });
});

module.exports = router;
