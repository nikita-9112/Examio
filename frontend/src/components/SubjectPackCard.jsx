import { useNavigate } from "react-router-dom";

import {
ArrowRight,
BookOpen,
Building2,
FileText,
} from "lucide-react";

const SubjectPackCard = ({ pack }) => {

const navigate = useNavigate();

const handleOpen = () => {
navigate(`/subject/${pack._id}`);
};

return (


<article
  onClick={handleOpen}
  className="
    group
    relative
    flex
    cursor-pointer
    flex-col
    overflow-hidden
    rounded-2xl
    border
    border-slate-200
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-blue-200
    hover:shadow-xl
  "
>

  {/* Top gradient */}

  <div
    className="
      h-1
      w-full
      bg-gradient-to-r
      from-blue-500
      via-indigo-500
      to-violet-500
    "
  />


  <div className="flex flex-1 flex-col p-5">


    {/* Header */}

    <div className="flex items-start justify-between gap-3">

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
          transition
          duration-300
          group-hover:bg-blue-100
        "
      >

        <BookOpen size={22} />

      </div>


      <span
        className="
          rounded-full
          bg-blue-50
          px-3
          py-1.5
          text-xs
          font-bold
          text-blue-700
        "
      >
        {pack.subjectCode}
      </span>

    </div>


    {/* Subject Name */}

    <div className="mt-5">

      <h3
        className="
          line-clamp-2
          text-xl
          font-bold
          leading-snug
          text-slate-900
          transition-colors
          group-hover:text-blue-700
        "
      >
        {pack.subjectName}
      </h3>


      <p className="mt-2 text-sm text-slate-500">
        Semester {pack.semester}
        <span className="mx-2">•</span>
        {pack.course}
        <span className="mx-2">•</span>
        {pack.branch}
      </p>

    </div>


    {/* University */}

    <div
      className="
        mt-4
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-slate-600
      "
    >

      <Building2
        size={17}
        className="shrink-0 text-indigo-600"
      />

      <span className="truncate">
        {pack.university}
      </span>

    </div>


    {/* Papers */}

    <div
      className="
        mt-5
        flex
        items-center
        gap-2
        rounded-xl
        bg-slate-50
        px-3
        py-2.5
      "
    >

      <FileText
        size={17}
        className="text-blue-600"
      />

      <span className="text-sm font-semibold text-slate-700">

        {pack.papers?.length || 0}{" "}
        Solved PYQs

      </span>

    </div>


    {/* Bottom */}

    <div className="mt-5 border-t border-slate-100 pt-5">

      <div className="flex items-center justify-between gap-3">


        {/* Price */}

        <div>

          <p className="text-xs font-medium text-slate-400">
            Subject Pack
          </p>

          <div className="mt-0.5 flex items-baseline gap-1">

            <span className="text-2xl font-extrabold text-slate-900">
              ₹{pack.price}
            </span>

            <span className="text-xs font-medium text-slate-400">
              one-time
            </span>

          </div>

        </div>


        {/* CTA */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            shadow-sm
            transition-all
            duration-300
            hover:bg-blue-700
            hover:shadow-md
            group-hover:gap-3
          "
        >

          View Pack

          <ArrowRight size={17} />

        </button>

      </div>

    </div>

  </div>

</article>


);

};

export default SubjectPackCard;
