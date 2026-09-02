import { SlidersHorizontal } from "lucide-react";

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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="mb-4 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <SlidersHorizontal
              size={18}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Filter Subject Packs
            </h2>

            <p className="text-xs text-slate-500">
              Narrow down your search
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Clear Filters
          </button>
        )}

      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {/* Semester */}

        <select
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">
            All Semesters
          </option>

          {semesters.map((item) => (
            <option key={item} value={item}>
              Semester {item}
            </option>
          ))}
        </select>


        {/* Branch */}

        <select
          value={branch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">
            All Branches
          </option>

          {branches.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>


        {/* Course */}

        <select
          value={course}
          onChange={(e) => onCourseChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">
            All Courses
          </option>

          {courses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>


        {/* University */}

        <select
          value={university}
          onChange={(e) => onUniversityChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
        >
          <option value="">
            All Universities
          </option>

          {universities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default SubjectPackFilters;