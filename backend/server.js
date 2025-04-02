
require("dotenv").config();
const initializeDefaultRoles = require('./config/initialDefaultRoles');

const requestRouter = require('./routes/requestRouts');
const authRouter = require('./routes/authRouts');
const roleRoutes = require('./routes/role');
const inventoryRoutes =require('./routes/inventroyRouts');
const dashboardRoutes = require('./routes/dashboardRouts');
const errorHandler = require('./middleware/errorMiddleware');
const traceId = require('./middleware/traceId');

const setupSwagger = require("./swagger/swagger");
const NotFoundError = require('./config/errors/NotFoundError')
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(traceId);
app.use(authRouter);
app.use(requestRouter);
app.use(roleRoutes);
app.use(inventoryRoutes);
app.use(dashboardRoutes);

setupSwagger(app);
app.use((req,res,next)=>{next(new NotFoundError(`Route ${req.originalUrl}`))});
app.use(errorHandler);




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

