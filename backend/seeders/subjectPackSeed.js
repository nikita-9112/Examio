require("dotenv").config();


const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const mongoose = require("mongoose");
const slugify = require("slugify");

const SubjectPack = require("../models/SubjectPack");
const User = require("../models/User");
const connectDb = require("../config/db");


// =====================================================
// CLOUDINARY PDF DATA
// =====================================================

const DEMO_PDFS = {
  1: {
    url: "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789531618/ExamIO_Sem1_Generic_Demo_ettgg4.pdf",
    publicId: "ExamIO_Sem1_Generic_Demo_ettgg4",
  },

  2: {
    url: "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789531903/ExamIO_Sem2_Generic_Demo_sachss.pdf",
    publicId: "ExamIO_Sem2_Generic_Demo_sachss",
  },

  3: {
    url: "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789531972/ExamIO_Sem3_Generic_Demo_m5dzd6.pdf",
    publicId: "ExamIO_Sem3_Generic_Demo_m5dzd6",
  },
};


const PAPER_PDFS = {
  1: [
    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 1",
      fileName: "ExamIO_Sem1_Sample_Paper_1_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532042/ExamIO_Sem1_Sample_Paper_1_With_Solution_t4glqd.pdf",
      publicId:
        "ExamIO_Sem1_Sample_Paper_1_With_Solution_t4glqd",
    },

    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 2",
      fileName: "ExamIO_Sem1_Sample_Paper_2_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532087/ExamIO_Sem1_Sample_Paper_2_With_Solution_lbbtau.pdf",
      publicId:
        "ExamIO_Sem1_Sample_Paper_2_With_Solution_lbbtau",
    },
  ],

  2: [
    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 1",
      fileName: "ExamIO_Sem2_Sample_Paper_1_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532150/ExamIO_Sem2_Sample_Paper_1_With_Solution_nic52t.pdf",
      publicId:
        "ExamIO_Sem2_Sample_Paper_1_With_Solution_nic52t",
    },

    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 2",
      fileName: "ExamIO_Sem2_Sample_Paper_2_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532195/ExamIO_Sem2_Sample_Paper_2_With_Solution_g1anwv.pdf",
      publicId:
        "ExamIO_Sem2_Sample_Paper_2_With_Solution_g1anwv",
    },
  ],

  3: [
    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 1",
      fileName: "ExamIO_Sem3_Sample_Paper_1_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532236/ExamIO_Sem3_Sample_Paper_1_With_Solution_ni203b.pdf",
      publicId:
        "ExamIO_Sem3_Sample_Paper_1_With_Solution_ni203b",
    },

    {
      examYear: 2026,
      examType: "Sample Paper With Solution - 2",
      fileName: "ExamIO_Sem3_Sample_Paper_2_With_Solution.pdf",
      pdfUrl:
        "https://res.cloudinary.com/ddm0noe2d/image/upload/v1789532275/ExamIO_Sem3_Sample_Paper_2_With_Solution_r2jhkr.pdf",
      publicId:
        "ExamIO_Sem3_Sample_Paper_2_With_Solution_r2jhkr",
    },
  ],
};


// =====================================================
// SUBJECT PACK DATA
// =====================================================

const subjectPacks = [

  // =========================
  // SEMESTER 1
  // =========================

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 1,
    subjectCode: "BT-101",
    subjectName: "Chemistry",
    description: "Sample study material and previous year style question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 1,
    subjectCode: "BT-102",
    subjectName: "M1",
    description: "Mathematics 1 sample study material and question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 1,
    subjectCode: "BT-103",
    subjectName: "English for Communication",
    description: "Sample communication skills study material and question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 1,
    subjectCode: "BT-104",
    subjectName: "BEEE",
    description: "Basic electrical and electronics engineering sample material.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 1,
    subjectCode: "BT-105",
    subjectName: "Engineering Graphics",
    description: "Engineering graphics sample study material and question papers.",
    price: 20,
  },


  // =========================
  // SEMESTER 2
  // =========================

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 2,
    subjectCode: "BT-201",
    subjectName: "Physics",
    description: "Physics sample study material and previous year style question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 2,
    subjectCode: "BT-202",
    subjectName: "M2",
    description: "Mathematics 2 sample study material and question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 2,
    subjectCode: "BT-203",
    subjectName: "BME",
    description: "Basic of mechanical engineering sample study material.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 2,
    subjectCode: "BT-204",
    subjectName: "BCME",
    description: "Basic of civil and mechanics engineering sample material.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 2,
    subjectCode: "BT-205",
    subjectName: "BCE",
    description: "Basic of computer science engineering sample material.",
    price: 20,
  },


  // =========================
  // SEMESTER 3
  // =========================

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 3,
    subjectCode: "BT-301",
    subjectName: "EEE",
    description: "Electrical and electronics engineering sample study material.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 3,
    subjectCode: "CS-302",
    subjectName: "Discrete Structure",
    description: "Discrete structure sample study material and question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 3,
    subjectCode: "CS-303",
    subjectName: "Data Structure",
    description: "Data Structures previous year question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 3,
    subjectCode: "CS-304",
    subjectName: "Digital System",
    description: "Digital systems sample study material and question papers.",
    price: 20,
  },

  {
    university: "RGPV",
    course: "B.Tech",
    branch: "Computer Science",
    semester: 3,
    subjectCode: "CS-305",
    subjectName: "OOPM",
    description: "Object oriented programming methodology sample material.",
    price: 20,
  },
];


// =====================================================
// SEED FUNCTION
// =====================================================

const seedSubjectPacks = async () => {

  try {

    await connectDb();

    console.log("MongoDB connected.");
    console.log("Starting SubjectPack seed...\n");


    // ---------------------------------------------
    // Find admin
    // ---------------------------------------------

    const admin = await User.findOne({
      role: "admin",
    });

    if (!admin) {
      throw new Error(
        "Admin user not found. Please create the admin first."
      );
    }

    console.log(`Using admin: ${admin.email}\n`);


    // ---------------------------------------------
    // Create / Update SubjectPacks
    // ---------------------------------------------

    for (const data of subjectPacks) {

      const semester = data.semester;

      const demoPdf = DEMO_PDFS[semester];

      const papers = PAPER_PDFS[semester].map((paper) => ({
        ...paper,
        uploadedAt: new Date(),
      }));


      const slug = slugify(
        `${data.subjectCode}-${data.subjectName}`,
        {
          lower: true,
          strict: true,
        }
      );


      // ---------------------------------------------
      // Find existing SubjectPack
      //
      // We intentionally don't include branch here.
      // This prevents duplicate packs if an existing
      // record has "CSE" instead of "Computer Science".
      // ---------------------------------------------

      const existingPack = await SubjectPack.findOne({
        university: data.university,
        course: data.course,
        semester: data.semester,
        subjectCode: data.subjectCode.toUpperCase(),
      });


      if (existingPack) {

        existingPack.university = data.university;
        existingPack.course = data.course;
        existingPack.branch = data.branch;
        existingPack.semester = data.semester;
        existingPack.subjectCode =
          data.subjectCode.toUpperCase();
        existingPack.subjectName = data.subjectName;
        existingPack.description = data.description;
        existingPack.price = data.price;
        existingPack.slug = slug;

        existingPack.demoPdfUrl = demoPdf.url;
        existingPack.demoPdfPublicId = demoPdf.publicId;

        existingPack.createdBy = admin._id;

        /*
         * We are replacing the sample papers with the
         * semester's two Cloudinary sample papers.
         *
         * This is useful for your clean demo dataset.
         */
        existingPack.papers = papers;

        await existingPack.save();

        console.log(
          `UPDATED  | ${data.subjectCode} | ${data.subjectName}`
        );

      } else {

        await SubjectPack.create({

          university: data.university,
          course: data.course,
          branch: data.branch,
          semester: data.semester,

          subjectCode:
            data.subjectCode.toUpperCase(),

          subjectName: data.subjectName,

          slug,

          description: data.description,

          price: data.price,

          thumbnailUrl: "",

          demoPdfUrl: demoPdf.url,

          demoPdfPublicId: demoPdf.publicId,

          isActive: true,

          papers,

          createdBy: admin._id,

          uploadedAt: new Date(),
        });


        console.log(
          `CREATED  | ${data.subjectCode} | ${data.subjectName}`
        );
      }
    }


    console.log("\n====================================");
    console.log("SubjectPack seed completed successfully!");
    console.log("====================================\n");

    process.exit(0);

  } catch (error) {

    console.error("\nSeed failed:");
    console.error(error);

    process.exit(1);
  }
};


seedSubjectPacks();