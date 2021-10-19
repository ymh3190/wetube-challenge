import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/wetube";

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`[DB CONNECTED] ${MONGO_URL}`);
  } catch (err) {
    console.log(`[DB ERROR] ${err}`);
  }
})();
