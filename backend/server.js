
require("dotenv").config();
const errorRouter = require('./routes/error')
const supplierRouter = require('./routes/supplierRouts');
const donationRouter = require('./routes/donationRouts');
const recipientRouter = require('./routes/recipientRouts');
const inventoryRouter = require('./routes/inventroyRouts');
const ddRouter = require('./routes/donationDetailsRouts');
const distributionRouter = require('./routes/distributionRouts');
const distributionDetailsRouter = require('./routes/distributionDetailsRouts');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const { pool, testConnection } = require('./util/dbConnection')
const setupSwagger = require("./swagger");

// pool.execute('select * from employees').then(([result, tableST])=>{
//         console.log(result)
//     }).catch()

testConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(supplierRouter);
app.use(donationRouter);
app.use(recipientRouter);
app.use(inventoryRouter);
app.use(ddRouter);
app.use(distributionRouter);
app.use(distributionDetailsRouter);
setupSwagger(app);

app.use(errorRouter);
const recreateDatabaseTables = async (option)=>{
    await sequelize.sync(option);
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
    recreateDatabaseTables({alter: true});
    console.log(`Server is running on port ${PORT}`);
});

