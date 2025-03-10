const mysql = require('mysql2/promise');


const pool = mysql.createPool({
     host:'localhost',
     user:'root',
     database:'todo-project',
     password:'427036Mm@'
    })

async function testConnection() {
        try {
          const connection = await pool.getConnection();
          console.log('Connected to MySQL successfully!');
          connection.release();
        } catch (err) {
          console.error('Error connecting to MySQL:', err.message);
        }
    }




module.exports = {pool, testConnection}