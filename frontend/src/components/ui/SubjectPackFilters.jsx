


import { SlidersHorizontal, X } from "lucide-react";

const SubjectPackFilters = ({
semester,
branch,
course,
university,
semesters,
branches,
courses,
universities,
onSemesterChange,
onBranchChange,
onCourseChange,
onUniversityChange,
onClear,
}) => {

const hasFilters =
semester ||
branch ||
course ||
university;

const selectClassName = `     w-full
    rounded-xl
    border
    border-slate-200
    bg-white
    px-3
    py-2.5
    text-sm
    font-medium
    text-slate-600
    outline-none
    transition-all
    duration-200
    hover:border-slate-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  `;

return (


<section className="mb-8">

  {/* Compact filter header */}

  <div className="mb-3 flex items-center justify-between">

    <div className="flex items-center gap-2">

      <SlidersHorizontal
        size={17}
        className="text-slate-500"
      />

      <span className="text-sm font-semibold text-slate-700">
        Filters
      </span>

    </div>


    {hasFilters && (

      <button
        type="button"
        onClick={onClear}
        className="
          flex
          items-center
          gap-1
          rounded-lg
          px-2
          py-1
          text-xs
          font-semibold
          text-blue-600
          transition
          hover:bg-blue-50
          hover:text-blue-700
        "
      >

        <X size={14} />

        Clear

      </button>

    )}

  </div>


  {/* Filters */}

  <div
    className="
      grid
      grid-cols-2
      gap-3
      sm:grid-cols-2
      md:grid-cols-4
      lg:grid-cols-4
    "
  >

    {/* Semester */}

    <select
      value={semester}
      onChange={(e) => onSemesterChange(e.target.value)}
      className={selectClassName}
    >

      <option value="">
        Semester
      </option>

      {semesters.map((item) => (

        <option
          key={item}
          value={item}
        >
          Semester {item}
        </option>

      ))}

    </select>


    {/* Branch */}

    <select
      value={branch}
      onChange={(e) => onBranchChange(e.target.value)}
      className={selectClassName}
    >

      <option value="">
        Branch
      </option>

      {branches.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>


    {/* Course */}

    <select
      value={course}
      onChange={(e) => onCourseChange(e.target.value)}
      className={selectClassName}
    >

      <option value="">
        Course
      </option>

      {courses.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>


    {/* University */}

    <select
      value={university}
      onChange={(e) => onUniversityChange(e.target.value)}
      className={selectClassName}
    >

      <option value="">
        University
      </option>

      {universities.map((item) => (

        <option
          key={item}
          value={item}
        >
          {item}
        </option>

      ))}

    </select>

  </div>

</section>


);

};



export default SubjectPackFilters;