import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./models/Service.js";

dotenv.config();

const services = [
  { name: "Shirt (Wash & Iron)", description: "Basic laundry wash & iron", price: 50, category: "Clothing", popular: false },
  { name: "Trousers (Wash & Iron)", description: "Trousers wash & iron", price: 60, category: "Clothing", popular: false },
  { name: "Jacket Dry Cleaning", description: "Professional dry cleaning", price: 120, category: "Clothing", popular: true },
  { name: "Curtains Cleaning", description: "Curtains deep cleaning", price: 200, category: "Home Appliances", popular: false },
  { name: "Sofa Cleaning", description: "Sofa deep cleaning", price: 300, category: "Home Appliances", popular: true },
  { name: "Bedsheet (Double)", description: "Double bed sheets", price: 100, category: "Blankets", popular: true },
  { name: "Blanket Cleaning", description: "Warm blankets cleaning", price: 150, category: "Blankets", popular: true },
  { name: "Pillow Cover", description: "Pillow cover wash", price: 30, category: "Blankets", popular: false },
  { name: "Shoe Cleaning", description: "Shoe deep cleaning", price: 80, category: "Shoes", popular: false },
  { name: "Sneaker Wash", description: "Sneaker cleaning & refresh", price: 100, category: "Shoes", popular: true },
];

const populate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log("✅ Services populated successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error populating services:", err);
    process.exit(1);
  }
};

populate();
