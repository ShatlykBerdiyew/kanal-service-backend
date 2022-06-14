const { json } = require("express");
const express = require("express");
const cors = require("cors");
const deliveryRouter = require("./routes/delivery.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(json());
app.use(cors());
app.use("/api", deliveryRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
