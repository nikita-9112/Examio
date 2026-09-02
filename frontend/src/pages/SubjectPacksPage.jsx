import { useEffect, useState } from "react";

import SubjectPackCard from "../components/SubjectPackCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

import { getAllSubjectPacks } from "../sevices/subjectService";

const SubjectPacksPage = () => {

const [subjectPacks, setSubjectPacks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

const fetchSubjectPacks = async () => {


try {

  setLoading(true);
  setError(false);

  const response = await getAllSubjectPacks();

  setSubjectPacks(
    Array.isArray(response.data)
      ? response.data
      : []
  );

} catch (err) {

  console.error(err);

  setSubjectPacks([]);
  setError(true);

} finally {

  setLoading(false);

}


};

useEffect(() => {


fetchSubjectPacks();


}, []);

return (


<main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

  {/* Page Header */}

  <section className="mb-10">

    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
      Subject Packs
    </h1>

    <p className="mt-2 max-w-2xl text-slate-500">
      Explore our collection of solved previous year
      question papers and find the right subject pack
      for your preparation.
    </p>

  </section>


  {/* Results Count */}

  {!loading && !error && subjectPacks.length > 0 && (

    <div className="mb-6">

      <p className="text-sm font-medium text-slate-500">

        {subjectPacks.length}{" "}
        {subjectPacks.length === 1
          ? "subject pack"
          : "subject packs"}{" "}
        available

      </p>

    </div>

  )}


  {/* Loading */}

  {loading ? (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3, 4, 5, 6].map((item) => (

        <SkeletonCard key={item} />

      ))}

    </div>


  ) : error ? (

    <ErrorState />


  ) : subjectPacks.length === 0 ? (

    <EmptyState
      title="No Subject Packs Found"
      description="New solved PYQs will be added soon. Please check back later."
    />


  ) : (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {subjectPacks.map((pack) => (

        <SubjectPackCard
          key={pack._id}
          pack={pack}
        />

      ))}

    </div>

  )}

</main>


);

};

export default SubjectPacksPage;
