
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  GitBranch,
  GraduationCap,
  MoreVertical,
  Pencil,
  Power,
  PlusCircle,
  Trash2,
  Clock,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PackCard = ({
  pack,
  onToggleStatus,
  onDelete,
  onAddPaper,
  isToggling,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const papersCount = pack?.papers?.length || 0;

  const formattedUpdatedAt = pack?.updatedAt
    ? new Date(pack.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const handleAddPaper = () => {
    setMenuOpen(false);
    onAddPaper?.(pack);
  };

  const handleEdit = () => {
    setMenuOpen(false);
    navigate(`/admin/subject-packs/${pack._id}/edit`);
  };

  const handleToggleActive = () => {
    setMenuOpen(false);
    onToggleStatus?.(pack);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete?.(pack);
  };

  const handleManagePack = () => {
    navigate(`/admin/subject-packs/${pack._id}`);
  };

  return (
    <article
      onClick={handleManagePack}
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
              transition-all
              duration-300
              group-hover:bg-indigo-50
              group-hover:text-indigo-600
            "
          >
            <BookOpen size={24} />
          </div>

          {/* Subject */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3
                className="
                  truncate
                  text-lg
                  font-bold
                  text-slate-900
                  sm:text-xl
                "
                title={pack?.subjectName}
              >
                {pack?.subjectName || "Subject Pack"}
              </h3>

              <span
                className="
                  rounded-full
                  bg-violet-50
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  text-violet-700
                "
              >
                {pack?.subjectCode || "N/A"}
              </span>

            </div>

            {/* University */}

            <div
              className="
                mt-1.5
                flex
                items-center
                gap-2
                text-sm
                text-slate-500
              "
            >
              <Building2
                size={16}
                className="shrink-0 text-violet-600"
              />

              <span className="truncate">
                {pack?.university || "University"}
              </span>
            </div>

          </div>
        </div>

        {/* Right side */}

        <div className="relative flex shrink-0 items-center gap-2">

          {/* Status */}

          <div
            className={`
              hidden
              items-center
              gap-1.5
              rounded-full
              px-2.5
              py-1
              text-xs
              font-semibold
              sm:flex

              ${
                pack?.isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }
            `}
          >
            {pack?.isActive ? (
              <CheckCircle2 size={13} />
            ) : (
              <Clock size={13} />
            )}

            {pack?.isActive ? "Active" : "Inactive"}
          </div>

          {/* More menu */}

          {onToggleStatus && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
                aria-label="Subject Pack actions"
              >
                <MoreVertical size={20} />
              </button>

              {menuOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute
                    right-0
                    top-11
                    z-30
                    w-56
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-1.5
                    shadow-xl
                  "
                >

                  {/* Add Paper */}

                  <button
                    type="button"
                    onClick={handleAddPaper}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-blue-50
                      hover:text-blue-700
                    "
                  >
                    <PlusCircle size={17} />
                    Add Paper
                  </button>

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <Pencil size={17} />
                    Edit Subject Pack
                  </button>

                  {/* Activate / Deactivate */}

                  <button
                    type="button"
                    onClick={handleToggleActive}
                    disabled={isToggling}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Power size={17} />

                    {isToggling
                      ? "Updating..."
                      : pack?.isActive
                      ? "Deactivate Pack"
                      : "Activate Pack"}
                  </button>

                  <div className="my-1.5 border-t border-slate-100" />

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    <Trash2 size={17} />
                    Delete Subject Pack
                  </button>

                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Mobile status */}

      <div className="mt-3 sm:hidden">
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold

            ${
              pack?.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }
          `}
        >
          {pack?.isActive ? (
            <CheckCircle2 size={13} />
          ) : (
            <Clock size={13} />
          )}

          {pack?.isActive ? "Active" : "Inactive"}
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

        {/* Semester */}

        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-600
          "
        >
          <CalendarDays
            size={14}
            className="text-indigo-500"
          />

          Semester {pack?.semester}
        </span>

        {/* Course */}

        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-600
          "
        >
          <GraduationCap
            size={14}
            className="text-purple-500"
          />

          {pack?.course}
        </span>

        {/* Branch */}

        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-600
          "
        >
          <GitBranch
            size={14}
            className="text-pink-500"
          />

          {pack?.branch}
        </span>

      </div>

      {/* Divider */}

      <div className="my-5 h-px bg-slate-100" />

      {/* Stats */}

      <div className="grid grid-cols-2 gap-3">

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

        {/* Last Updated */}

        <div
          className="
            rounded-xl
            bg-violet-50
            p-3
          "
        >
          <div className="flex items-center gap-2">

            <Clock
              size={17}
              className="text-violet-600"
            />

            <span className="text-xs text-slate-500">
              Updated
            </span>

          </div>

          <p
            className="
              mt-2
              truncate
              text-sm
              font-bold
              text-violet-700
            "
            title={formattedUpdatedAt}
          >
            {formattedUpdatedAt}
          </p>

        </div>

      </div>

      {/* Manage Button */}

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
          Manage Subject Pack
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

export default PackCard;
