const {
  find,
  findByID,
  createNew,
  edit,
  deleteA,
} = require("../config/dbQueries");

const getAllUser = async (req, res) => {
  try {
    const listUsers = await find();
    return res.json({ listUsers });
  } catch (error) {
    console.log(error);
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const infoUser = await findByID(id);
    return res.status(200).json({ infoUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const createUser = async (req, res) => {
  const REQUIRE_FIELDS = ["email", "name", "city"];

  // Check field is exist
  REQUIRE_FIELDS.forEach((f) => {
    if (!req.body[f]) {
      return res.status(500).json({ message: "Missing " + f });
    }
  });

  const { email, name, city } = req.body;
  try {
    const newUser = await createNew(email, name, city);
    return res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const editUserByID = async (req, res) => {
  const REQUIRE_FIELDS = ["email", "name", "city"];

  // Check field is exist
  REQUIRE_FIELDS.forEach((f) => {
    if (!req.body[f]) {
      return res.status(500).json({ message: "Missing " + f });
    }
  });

  const { email, name, city } = req.body;
  const id = req.params.id;

  try {
    const editedUser = await edit(email, name, city, id);
    return res.status(200).json({ editedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const deleteUserByID = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await deleteA(id);
    return res.status(200).json({ deletedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred" });
  }
};

module.exports = {
  getAllUser,
  getUserByID,
  createUser,
  editUserByID,
  deleteUserByID,
};
