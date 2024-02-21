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
  global.allFoodsData = allFoodsData;
  // console.log(global.allFoodsData);

  //Fetch foodCategory for display Front-end
  const foodDataCategory = mongoose.connection.db.collection("foodCategory");
  const allFoodCategory = await foodDataCategory.find({}).toArray();
  global.allFoodCategory = allFoodCategory;
  // console.log(global.allFoodCategory);
};

module.exports = mongodb();
