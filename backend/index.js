const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoDB = require("./db");
const myOrderRoute = require('./routes/MyOrders');



mongoDB();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", " http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
})

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.use('/api', myOrderRoute);
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
