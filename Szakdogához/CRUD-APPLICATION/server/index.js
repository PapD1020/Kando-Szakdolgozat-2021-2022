const express = require('express');
const app = express();

app.get('/', (req, res)=>{      //req is used to get information from the frontend
    res.send("Hello world");    //sending this information to frontend (not yet to react)
})

app.listen(3001, () => {
    console.log("Running on port 3001");
});