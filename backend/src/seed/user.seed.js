import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    role: "admin",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    role: "admin",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
    role: "user",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "123456",
    role: "user",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "123456",
    role: "user",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "123456",
    role: "user",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "123456",
    role: "user",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "123456",
    role: "user",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    role: "admin",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    role: "admin",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
    role: "user",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
    role: "user",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    role: "user",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
    role: "user",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
    role: "user",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Hash passwords for each user
    for (let user of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
