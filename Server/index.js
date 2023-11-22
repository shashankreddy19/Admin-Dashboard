const {
  dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat
} =require("./Data/Data.js");
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const helmet =require("helmet")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv=require("dotenv")
const general = require("./Routes/General.js")
const management = require("./Routes/Management.js")
const sales = require("./Routes/Sales.js")
const client = require("./Routes/Client.js")
const affiliate = require("./models/AffiliateStat.js")
const colors = require('colors');
// const product = require("./models/Products.js");
// const productStat  = require("./models/ProductStat.js");
// const transactions = require("./models/Transactions.js");
// const stats = require("./models/OverviewStat.js");
// const users = require("./models/User.jsx")

// CONFIGURATIONS

dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTING

app.use('/general',general)
app.use('/sales',sales)
app.use('/client',client)
app.use('/management', management)

// MONGODB

const port = process.env.PORT 
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, }).then(()=>
    app.listen(port, () =>
    {
      console.log(`Server connected to ${port}`.bgGreen.white);
      console.log(`MongoDB connected to ${mongoose.connection.host}`.bgGreen.white);
      // affiliate.insertMany(dataAffiliateStat);
    })).catch((err) =>
        {
        console.log(`${err} did not connected`);
        })
 