const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 3000;

// Connection mongo
const uri = 'mongodb://127.0.0.1:27017/db';
mongoose.connect(uri, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('mongo data base connected');
  }
});
// Creation dataB
const entitySchema = new mongoose.Schema({
  title: String,
  description: String,
});

// na5la9 el model
const Entity = mongoose.model("Entity", entitySchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Creation
app.post("/entities", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newEntity = await Entity.create({ title, description });
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// na9ra kol
app.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read wehed
app.get("/entities/:id", async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// nupdati
app.put("/entities/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedEntity = await Entity.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedEntity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fasa5
app.delete("/entities/:id", async (req, res) => {
  try {
    await Entity.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // les comptes eli 3ana
  if (email === "admin@gmail.com" && password === "123456") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// serveur te3na
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
