
require("dotenv").config();
const initializeDefaultRoles = require('./config/initialDefaultRoles');
const errorRouter = require('./routes/error');
// const supplierRouter = require('./routes/supplierRouts');
// const donationRouter = require('./routes/donationRouts');
// const recipientRouter = require('./routes/recipientRouts');
// const inventoryRouter = require('./routes/inventroyRouts');
// const ddRouter = require('./routes/donationDetailsRouts');
// const distributionRouter = require('./routes/distributionRouts');
// const distributionDetailsRouter = require('./routes/distributionDetailsRouts');
const authRouter = require('./routes/authRouts');
const setupSwagger = require("./swagger/swagger");
const roleRoutes = require('./routes/role');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(authRouter)
app.use(roleRoutes);
// app.use(supplierRouter);
// app.use(donationRouter);
// app.use(recipientRouter);
// app.use(inventoryRouter);
// app.use(ddRouter);
// app.use(distributionRouter);
// app.use(distributionDetailsRouter);
setupSwagger(app);
app.use(errorRouter);

// mongoose.connect('process.env.MONGO_URI').then(result=>{
//     initializeDefaultRoles().then(()=>{
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     })
   
// }).catch(err=>{
//     console.error(err)
// })


async function startServer() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
  
      await initializeDefaultRoles();
      console.log('Default roles initialized');
  
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } catch (err) {
      console.error(' Failed to start server:', err);
      process.exit(1);
    }
  }
startServer();

