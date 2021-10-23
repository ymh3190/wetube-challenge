import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`[DB CONNECTED] ${process.env.DB_URL}`);
  } catch (err) {
    console.log(`[DB ERROR] ${err}`);
  }
})();
