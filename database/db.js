const mongoose = require("mongoose");
require("dotenv").config();

const mongodburi = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWD}@cluster0.pg0dj0q.mongodb.net/food-app`;

const mongodb = async () => {
  await mongoose
    .connect(mongodburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  // --------------For collection data --------------//

  //Fetch data for display Front-end
  const foodDataCollection = mongoose.connection.db.collection("foodData");
  const allFoodsData = await foodDataCollection.find({}).toArray();
  // console.log(allFoodDatas);
  global.allFoodsData = allFoodsData;
  // console.log(global.allFoodsData);
};

module.exports = mongodb();
