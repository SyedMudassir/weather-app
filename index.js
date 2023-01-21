const express = require("express");
const mongoose = require("mongoose");
const { citiesData } = require("./model/weatherDataModel");
const app = express();
const axios = require("axios");
const cors = require("cors");
const { server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://weather-app:weatherapp@cluster0.klok7q6.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });

const defaultCities = ["karachi", "lahore", "islamabad", "peshawar", "quetta"];
const defaultCitiesData = [];
const weatherData = () => {
  defaultCities.map((city, index) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=838782e78556e8b75bca102092c7d6f2&units=metric`
      )
      .then((resp) => {
        const obj = {
          temperature: resp.data.main.temp,
          city: resp.data.name,
          weatherOverview: resp.data.weather[0].description,
        };
        defaultCitiesData.push(obj);

        const cityFound = citiesData.findOne({ city: resp.data.name });
        if (cityFound) {
          citiesData.updateOne({ city: resp.data.name }, obj);
        } else {
          citiesData.create(obj);
        }
      });
  });
};
setInterval(() => {
  weatherData();
}, 5000);

app.get("/", async (req, res) => {
  const dbCitiesData = await citiesData.find();
  console.log(dbCitiesData);
  res.status(200).json({
    sucess: true,
    dbCitiesData,
  });
});
// app.listen(4000, () => {
//   console.log("connected");
// });
const http = require("http").Server(app);
http.listen(4000, () => {
  console.log("connected");
});

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});
