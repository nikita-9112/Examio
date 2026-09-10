import { useNavigate } from "react-router-dom";

import {
ArrowRight,
BookOpen,
Building2,
CalendarDays,
CheckCircle2,
FileText,
Clock,
} from "lucide-react";

const LibraryCard = ({ pack }) => {

const navigate = useNavigate();

const subjectPack = pack?.subjectPack;

const papersCount = subjectPack?.papers?.length || 0;

// Null expiry means lifetime access
const isActive =
  !pack?.expiresAt ||
  new Date(pack.expiresAt) > new Date();

const formattedExpiry = pack?.expiresAt
? new Date(pack.expiresAt).toLocaleDateString(
"en-IN",
{
day: "numeric",
month: "short",
year: "numeric",
}
)
: "Lifetime Access";

const handleOpenPack = () => {


if (!subjectPack?._id) return;

navigate(`/subject/${subjectPack._id}`);


};

return (


<article
  onClick={handleOpenPack}
  className="
    group
    relative
    cursor-pointer
    overflow-hidden
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-blue-200
    hover:shadow-lg
  "
>

  {/* Top accent */}

  <div
    className="
      absolute
      inset-x-0
      top-0
      h-1
      bg-gradient-to-r
      from-blue-500
      via-indigo-500
      to-violet-500
    "
  />


  {/* Header */}

  <div className="flex items-start justify-between gap-3">

    <div className="flex min-w-0 items-center gap-3">

      {/* Icon */}

      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
        "
      >
        <BookOpen size={24} />
      </div>


      {/* Subject */}

      <div className="min-w-0">

        <h3
          className="
            truncate
            text-lg
            font-bold
            text-slate-900
            sm:text-xl
          "
          title={subjectPack?.subjectName}
        >
          {subjectPack?.subjectName || "Subject Pack"}
        </h3>


        <span
          className="
            mt-1
            inline-flex
            rounded-full
            bg-violet-50
            px-2.5
            py-1
            text-xs
            font-semibold
            text-violet-700
          "
        >
          {subjectPack?.subjectCode || "N/A"}
        </span>

      </div>

    </div>


    {/* Access Status */}

    <div
      className={`
        shrink-0
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold

        ${
          isActive
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }
      `}
    >

      {isActive ? "Active" : "Expired"}

    </div>

  </div>


  {/* Course Information */}

  <div
    className="
      mt-5
      flex
      flex-wrap
      gap-2
    "
  >

    <span
      className="
        rounded-lg
        bg-slate-50
        px-3
        py-1.5
        text-xs
        font-medium
        text-slate-600
      "
    >
      Semester {subjectPack?.semester}
    </span>


    <span
      className="
        rounded-lg
        bg-slate-50
        px-3
        py-1.5
        text-xs
        font-medium
        text-slate-600
      "
    >
      {subjectPack?.course}
    </span>


    <span
      className="
        rounded-lg
        bg-slate-50
        px-3
        py-1.5
        text-xs
        font-medium
        text-slate-600
      "
    >
      {subjectPack?.branch}
    </span>

  </div>


  {/* University */}

  <div
    className="
      mt-4
      flex
      items-center
      gap-2
      text-sm
      text-slate-600
    "
  >

    <Building2
      size={17}
      className="shrink-0 text-violet-600"
    />

    <span className="truncate">
      {subjectPack?.university || "University"}
    </span>

  </div>


  {/* Divider */}

  <div className="my-5 h-px bg-slate-100" />


  {/* Stats */}

  <div
    className="
      grid
      grid-cols-2
      gap-3
    "
  >

    {/* Papers */}

    <div
      className="
        rounded-xl
        bg-blue-50
        p-3
      "
    >

      <div className="flex items-center gap-2">

        <FileText
          size={17}
          className="text-blue-600"
        />

        <span className="text-xs text-slate-500">
          Papers
        </span>

      </div>


      <p
        className="
          mt-2
          text-lg
          font-bold
          text-slate-900
        "
      >
        {papersCount}
      </p>

    </div>


    {/* Access */}

    <div
      className={`
        rounded-xl
        p-3

        ${
          isActive
            ? "bg-emerald-50"
            : "bg-red-50"
        }
      `}
    >

      <div className="flex items-center gap-2">

        {isActive ? (

          <CheckCircle2
            size={17}
            className="text-emerald-600"
          />

        ) : (

          <Clock
            size={17}
            className="text-red-500"
          />

        )}


        <span className="text-xs text-slate-500">
          Access
        </span>

      </div>


      <p
        className={`
          mt-2
          truncate
          text-sm
          font-bold

          ${
            isActive
              ? "text-emerald-700"
              : "text-red-600"
          }
        `}
      >
        {formattedExpiry}

      </p>

    </div>

  </div>


  {/* Open Button */}

  <div
    className="
      mt-5
      flex
      items-center
      justify-between
      rounded-xl
      border
      border-blue-100
      bg-blue-50
      px-4
      py-3
      transition-all
      duration-300
      group-hover:border-blue-200
      group-hover:bg-blue-100
    "
  >

    <span
      className="
        text-sm
        font-semibold
        text-blue-700
      "
    >
      {isActive
        ? "Open Subject Pack"
        : "Access Expired"
      }
    </span>


    <ArrowRight
      size={19}
      className="
        text-blue-600
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    />

  </div>

</article>


);

};

export default LibraryCard;
