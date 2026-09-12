import { useEffect, useState } from "react";

import SubjectPackCard from "../components/SubjectPackCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";

import { getAllSubjectPacks } from "../sevices/subjectService";
import SearchInput from "../components/SearchInput";
import SubjectPackFilters from "../components/ui/SubjectPackFilters";

const SubjectPacksPage = () => {

const [subjectPacks, setSubjectPacks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);


const [search, setSearch] = useState("");

const [semester, setSemester] = useState("");
const [branch, setBranch] = useState("");
const [course, setCourse] = useState("");
const [university, setUniversity] = useState("");

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


const filteredPacks = subjectPacks.filter((pack) => {
  const searchTerm = search.toLowerCase().trim();

  const matchesSearch =
    !searchTerm ||
    pack.subjectName?.toLowerCase().includes(searchTerm) ||
    pack.subjectCode?.toLowerCase().includes(searchTerm) ||
    pack.university?.toLowerCase().includes(searchTerm) ||
    pack.course?.toLowerCase().includes(searchTerm) ||
    pack.branch?.toLowerCase().includes(searchTerm);

  const matchesSemester =
    !semester ||
    String(pack.semester) === String(semester);

  const matchesBranch =
    !branch ||
    pack.branch === branch;

  const matchesCourse =
    !course ||
    pack.course === course;

  const matchesUniversity =
    !university ||
    pack.university === university;

  return (
    matchesSearch &&
    matchesSemester &&
    matchesBranch &&
    matchesCourse &&
    matchesUniversity
  );
});


const semesters = [
  ...new Set(
    packs
      .map((pack) => pack.semester)
      .filter(Boolean)
  ),
].sort((a, b) => a - b);

const branches = [
  ...new Set(
    subjectPacks
      .map((pack) => pack.branch)
      .filter(Boolean)
  ),
].sort();

const courses = [
  ...new Set(
    subjectPacks
      .map((pack) => pack.course)
      .filter(Boolean)
  ),
].sort();

const universities = [
  ...new Set(
    subjectPacks
      .map((pack) => pack.university)
      .filter(Boolean)
  ),
].sort();


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

  {/* search input */}

  <section className="mb-8">
  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="Search by subject, code, university..."
  />
</section>

{/* filter section */}

<SubjectPackFilters
  semester={semester}
  branch={branch}
  course={course}
  university={university}
  semesters={semesters}
  branches={branches}
  courses={courses}
  universities={universities}
  onSemesterChange={setSemester}
  onBranchChange={setBranch}
  onCourseChange={setCourse}
  onUniversityChange={setUniversity}
  onClear={() => {
    setSearch("");
    setSemester("");
    setBranch("");
    setCourse("");
    setUniversity("");
  }}
/>


  {/* Results Count */}

  {!loading && !error && subjectPacks.length > 0 && (
  <div className="mb-6">
    <p className="text-sm font-medium text-slate-500">
      {filteredPacks.length}{" "}
      {filteredPacks.length === 1
        ? "subject pack"
        : "subject packs"}{" "}
      found
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
) : filteredPacks.length === 0 ? (
  <EmptyState
    title="No Matching Subject Packs"
    description="Try searching with a different subject name, code, university, course, or branch."
  />
) : (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {filteredPacks.map((pack) => (
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
