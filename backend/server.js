
const express = require('express');
const cors = require('cors');


const app = express();


app.use(express.json()); 
app.use(express.urlencoded({extended: true}))
app.use(cors()); 


app.get('/', (req, res,next) => {
    res.send('Welcome to Regina Humane Society API!');
});


const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
