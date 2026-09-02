import { useNavigate } from "react-router-dom";

import {
ArrowRight,
BookOpen,
Library,
Search,
} from "lucide-react";

const QuickStarts = () => {

const navigate = useNavigate();

const quickActions = [


{
  title: "Explore Subject Packs",
  description:
    "Browse available subject packs and solved PYQs.",
  icon: Search,
  action: () => navigate("/subject-packs"),
  iconBg: "bg-blue-50",
  iconColor: "text-blue-600",
},

{
  title: "Browse My Library",
  description:
    "View and access your purchased subject packs.",
  icon: Library,
  action: () => {

    document
      .getElementById("my-library")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

  },
  iconBg: "bg-violet-50",
  iconColor: "text-violet-600",
},


];

return (


<section>

  {/* Section Header */}

  <div className="mb-6">

    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
      Quick Start
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Jump back into Examio and continue preparing.
    </p>

  </div>


  {/* Quick Actions */}

  <div className="grid gap-5 sm:grid-cols-2">

    {quickActions.map((item) => {

      const Icon = item.icon;

      return (

        <button
          key={item.title}
          onClick={item.action}
          className="
            group
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            text-left
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-200
            hover:shadow-md
          "
        >

          {/* Icon */}

          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${item.iconBg}
              ${item.iconColor}
            `}
          >

            <Icon size={23} />

          </div>


          {/* Text */}

          <div className="min-w-0 flex-1">

            <h3 className="font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.description}
            </p>

          </div>


          {/* Arrow */}

          <ArrowRight
            size={20}
            className="
              shrink-0
              text-slate-400
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:text-blue-600
            "
          />

        </button>

      );

    })}

  </div>

</section>


);

};

export default QuickStarts;
