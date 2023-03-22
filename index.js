const express = require('express')
var bodyParser = require('body-parser')
var { BarcodeReader } = require('dynamsoft-javascript-barcode');
var crypto = require("crypto");

const cors = require('cors')
const app = express()

// app.use(bodyParser)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '50mb'}))




app.use(cors())

let reader;

app.post('/scan', async (req, res) => {

    // Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.

    const { body } = req;

    // await Dynamsoft.DBR.BarcodeReader.loadWasm();

    console.log("============== create reader ==============");

    if(!reader){
        reader = await BarcodeReader.createInstance();
    }

    // const reader = await (pReader = pReader || Dynamsoft.DBR.BarcodeReader.createInstance());
    console.log("============== decode base64 ==============");

    const result = await reader.decodeBase64String(body.data);

    // reader.destroy();


    res.send(result);

    // process.exit();


})


app.listen(5000, async (req, res) => {
    console.log('server started on port 5000');

    BarcodeReader.license = "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9"
    // console.log(Dynamsoft);

});