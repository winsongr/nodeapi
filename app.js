const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use(`/api/categories`, categoriesRoutes);
app.use(`/api/products`, productsRoutes);
app.use(`/api/users`, usersRoutes);
app.use(`/api/orders`, ordersRoutes);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Database
mongoose
  .connect(
    "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "nodeapi",
    }
  )
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log("server is running " + port);
});
