const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Patient = require("./Models/pacienti");
const req = require("express/lib/request");
mongoose.connect(
  "mongodb+srv://blini:Blini0100@optika.hsklm.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.render("home", { patients });
});
app.get("/patients", async (req, res) => {
  const patients = await Patient.find({});
  res.render("./patients/index", { patients });
});
app.get("/patients/new", (req, res) => {
  res.render("patients/new");
});
app.get("/patients/:emri", async (req, res) => {
  const patient = await Patient.findById(req.params.emri);
  res.render("./patients/show", { patient });
});
app.get("/patients/search", async (req, res) => {
  const patient = await Patient.find(req.params.emri);
  res.render("./patients/index", { patient });
});
app.get("/createpatient", async (req, res) => {
  const pacienti = new Patient({ emri: "Arian" });
  await pacienti.save();
  res.send(pacienti);
});
app.post("/patients", async (req, res) => {
  const patient = new Patient(req.body.patient);
  await patient.save();
  res.redirect(`/patients/${patient._id}`);
});

app.get("/patients/:id/edit", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render("patients/edit", { patient });
});

app.put("/patients/:id", async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndUpdate(id, { ...req.body.patient });
  res.redirect(`/patients/${patient._id}`);
});
app.delete("/patients/:id", async (req, res) => {
  const { id } = req.params;
  await Patient.findByIdAndDelete(id);
  res.redirect("/patients");
});

app.listen(3000, () => {
  console.log("Connected to `port`");
});
