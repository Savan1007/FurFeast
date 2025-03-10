const mysql = require("mysql2/promise");
const { createTableSQL } = require("../sql_script/script");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "rhs",
  password: "Savan1007$",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true // Enable multiple statements

});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL successfully!");
    // createTables();
    connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err.message);
  }
}

const createTables = async () => {
console.log("Creating tables...", typeof(createTableSQL));
  try {
    await pool.query(createTableSQL);
    console.log("Tables created successfully or already exist.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

module.exports = { pool, testConnection };
