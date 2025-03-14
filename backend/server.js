
// require("dotenv").config();
require("dotenv").config();
const errorRouter = require('./routes/error')
const supplierRouter = require('./routes/supplierRouts');
const donationRouter = require('./routes/donationRouts');
const recipientRouter = require('./routes/recipientRouts');
const inventoryRouter = require('./routes/inventroyRouts');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const { pool, testConnection } = require('./util/dbConnection')
const setupSwagger = require("./swagger");

// pool.execute('select * from employees').then(([result, tableST])=>{
    //     console.log(result)
    // }).catch()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(supplierRouter);
app.use(donationRouter);
app.use(recipientRouter);
app.use(inventoryRouter);
setupSwagger(app);
app.use(errorRouter);
const m = async ()=>{
    await sequelize.sync({ force: true });
}

const PORT = process.env.PORT;
app.listen(3000, () => {
    m();
    console.log(`Server is running on port ${PORT}`);
});
