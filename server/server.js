const express = require('express');
const dotenv = require('dotenv');   

dotenv.config({ path: "./.env"})

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Working</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
})