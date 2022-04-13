const express = require('express');
const  PORT = 5000;
const app = express();
const getTwoPoints = require('./parser/parser');
app.use(express.json());
app.post('/',  (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");

    const cordArray = {w1: req.body.w1, d1: req.body.d1, w2: req.body.w2, d2: req.body.d2 };

    getTwoPoints(cordArray).then(result => {
        const heights = result.map( item => parseInt(item));
        console.log(heights)
        return res.status(200).json({

            heightsArray: heights
        })
    })
        .catch( () => {
            res.message = 'Ресурс недоступен';
            return res.status(500).json({message: 'ошибка'});
        })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})