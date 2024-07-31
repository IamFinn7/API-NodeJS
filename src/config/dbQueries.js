const connection = require("./dbConfig");

const find = async () => {
  const QUERY = "SELECT * FROM Users";
  try {
    const client = await connection;
    const results = await client.query(QUERY);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findByID = async (id) => {
  const QUERY = "SELECT * FROM Users WHERE id = ?";
  try {
    const client = connection;
    const results = await client.query(QUERY, [id]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNew = async (email, name, city) => {
  const QUERY = "INSERT INTO Users (email, name, city) VALUES (?, ?, ?)";
  try {
    const client = connection;
    const results = await client.query(QUERY, [email, name, city]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const edit = async (email, name, city, id) => {
  const QUERY = "UPDATE Users SET email = ?, name = ?, city = ? WHERE id = ?";
  try {
    const client = connection;
    const results = await client.query(QUERY, [email, name, city, id]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteA = async (id) => {
  const QUERY = "DELETE FROM Users WHERE id = ?";
  try {
    const client = connection;
    const results = await client.query(QUERY, [id]);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { find, findByID, createNew, edit, deleteA };
