//#region Part1:Simple CRUD Operations Using Express.js
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // Parsing data

const usersPath = path.resolve("./users.json");
const readFile = fs.readFileSync(usersPath, { encoding: "utf-8" });
const user = JSON.parse(readFile);
// console.log(user);
// 1- addUser
app.post("/addUser", (req, res, nex) => {
  // check email and return response
  const { email } = req.body;
  const userEmail = user.find((value) => {
    return value.email == email;
  });
  if (userEmail) {
    return res.status(404).json({ msg: "Email already exists." });
  }
  // id
  req.body.id = user[user.length - 1].id + 1;
  // push data in users.json
  user.push(req.body);
  fs.writeFileSync(usersPath, JSON.stringify(user));
  console.log(user);
  // Response
  return res.status(200).json({ msg: "User added successfully.", user });
});
// 2- updateUser
app.patch("/updateUser/:userId", (req, res, next) => {
  // check id and return res.
  const { userId } = req.params;
  const userById = user.find((value) => {
    return value.id == userId;
  });
  if (userById == undefined) {
    return res.status(404).json({ msg: "User ID not found." });
  }
  // update data => users.json and return res.
  const { age, name } = req.body;
  userById.age = age;
  fs.writeFileSync(usersPath, JSON.stringify(user));
  console.log(user);

  return res.json({ msg: "User age updated successfully.", userById });
});
// 3- Delete UserById
app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  const userId = user.find((value) => {
    return value.id == id;
  });
  if (userId == undefined) {
    return res.status(404).json({ msg: "User ID not found" });
  }

  user.splice(userId, 1);
  fs.writeFileSync(usersPath, JSON.stringify(user));
  return res.json({ msg: "User deleted successfully." });
});
// 4- User getByName
app.get("/user/getByName", (req, res, next) => {
  const { name } = req.query;
  const userName = user.find((value) => {
    return value.name == name;
  });
  //   console.log(userName);
  if (userName == undefined) {
    return res.status(404).json({ msg: "User name not found." });
  }

  return res.json({ msg: "getUserByNmae", userName });
});
// 5- getAllUsers
app.get("/getAllUsers", (req, res) => {
  // fs.writeFileSync(usersPath,JSON.stringify(user))
  user.push(req.body);
  return res.sendFile(usersPath);
});
// 6- Filter
app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query.minAge);
  const userAge = user.filter((value) => {
    return value.age >= minAge;
  });
  if (userAge.length === 0) {
    return res.status(404).json({ msg: "no user found." });
  }

  return res.json({ userAge });
});
// 7- getUserById
app.get("/getUserById/:id", (req, res) => {
  const { id } = req.params;
  const userId = user.findIndex((value) => {
    return value.id == id;
  });
  if (userId == -1) {
    return res.status(404).json({ msg: "User not found." });
  }

  const userById = user[userId];
  console.log(userById);

  return res.json(userById);
});
// notFound
app.all("{/*dummy}", (req, res) => {
  return res.status(404).json("Invalid Url Or Methode.");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
//#endregion

//#region Part 2: ERD Diagram.


//#endregion
