require("dotenv").config();

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const mongoose = require("mongoose");

const connectDb = require("../config/db");
const User = require("../models/User");
const SubjectPack = require("../models/SubjectPack");

const createSubjectPack = async () => {
  try {
    await connectDb();

    // Find the admin
    const admin = await User.findOne({
      role: "admin"
    });

    if (!admin) {
      console.log("Admin not found. Create admin first.");
      process.exit(1);
    }

    console.log("Admin found:", admin.email);
    console.log("Admin ID:", admin._id);

    // Check whether this subject already exists
    const existingPack = await SubjectPack.findOne({
      slug: "rgpv-btech-cse-sem3-data-structures"
    });

    if (existingPack) {
      console.log("SubjectPack already exists.");
      process.exit(0);
    }

    // Create SubjectPack
    const subjectPack = await SubjectPack.create({
      university: "RGPV",
      course: "B.Tech",
      branch: "Computer Science",
      semester: 3,

      subjectCode: "CS301",
      subjectName: "Data Structures",

      slug: "rgpv-btech-cse-sem3-data-structures",

      description: "Data Structures previous year question papers.",

      price: 20,

      thumbnailUrl: "",
      demoPdfUrl: "",
      demoPdfPublicId: "",

      isActive: true,

      papers: [],

      createdBy: admin._id
    });

    console.log("SubjectPack created successfully!");
    console.log(subjectPack);

    process.exit(0);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createSubjectPack();