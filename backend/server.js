
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { pool, testConnection } = require('./util/dbConnection')
const app = express();
const  {Donor, Inventory, Log}  = require('./models');





app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// pool.execute('select * from employees').then(([result, tableST])=>{
//     console.log(result)
// }).catch()

async function testConnectionS() {
   const donor = await Donor.findAll();
   const inventroy = await Inventory.findAll();
   const log = await Log.findAll();
}
testConnectionS();

app.get('/', (req, res, next) => {
    res.send('Welcome to Regina Humane Society API!');
});


const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
