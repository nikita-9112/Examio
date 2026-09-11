import { GraduationCap, BookOpen, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const About = ()=> {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">

          <div className="flex justify-center mb-5">
            <div className="p-4 rounded-2xl bg-blue-100 text-blue-600">
              <GraduationCap size={42} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About Examio
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your study material, all in one place.
          </p>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-7">
            Examio is a simple platform created to help students
            find and access useful study material for their subjects.
            We organize resources into Subject Packs, making it easier
            to find the material you need in one convenient place.
          </p>

        </div>
      </section>


      {/* What Examio Offers */}
      <section className="max-w-6xl mx-auto px-6 py-14">

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          What Examio Offers
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Everything is kept simple and focused on your studies.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* Subject Packs */}
          <Card>
            <div className="p-6 text-center">

              <div className="w-14 h-14 mx-auto flex items-center justify-center
                              rounded-xl bg-blue-100 text-blue-600">
                <BookOpen size={28} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-5">
                Subject Packs
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Get study material organized subject-wise in one
                convenient place.
              </p>

            </div>
          </Card>


          {/* Easy Access */}
          <Card>
            <div className="p-6 text-center">

              <div className="w-14 h-14 mx-auto flex items-center justify-center
                              rounded-xl bg-green-100 text-green-600">
                <Target size={28} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-5">
                Easy to Access
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                Find the resources you need without unnecessary
                complexity.
              </p>

            </div>
          </Card>


          {/* Student Focused */}
          <Card>
            <div className="p-6 text-center">

              <div className="w-14 h-14 mx-auto flex items-center justify-center
                              rounded-xl bg-purple-100 text-purple-600">
                <Heart size={28} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-5">
                Made for Students
              </h3>

              <p className="text-gray-600 mt-3 leading-6">
                A simple and student-friendly experience designed
                around your learning needs.
              </p>

            </div>
          </Card>

        </div>

      </section>


      {/* Our Goal */}
      <section className="bg-white border-y border-gray-100">

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            Our Goal
          </h2>

          <p className="mt-5 text-gray-600 leading-7">
            Our goal is simple — to make quality study material
            easier to find and access.
          </p>

          <div className="mt-8 bg-blue-50 border border-blue-100
                          rounded-2xl p-8">

            <p className="text-2xl md:text-3xl font-semibold text-blue-700">
              "Make studying simpler. Stay organized."
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="bg-indigo-700 rounded-3xl px-6 py-12
                        text-center text-white">

          <h2 className="text-3xl font-bold">
            Ready to explore your Subject Packs?
          </h2>

          <p className="mt-3 text-blue-100">
            Find the study material you need and get started.
          </p>

          <div className="mt-7">
            <Link to="/subject-packs">
              <Button>
                Explore Subject Packs
              </Button>
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;