import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

import Card from "./ui/Card";
import Button from "./ui/Button";

const SubjectPackCard = ({
subjectName,
subjectCode,
semester,
price,
slug,
}) => {
return (
<Card
className="
group
flex
flex-col
justify-between
"
>
<div>

    <div
      className="
        mb-4
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        bg-blue-50
        text-blue-600
      "
    >
      <BookOpen size={24} />
    </div>

    <h3
      className="
        text-2xl
        font-semibold
        text-slate-900
      "
    >
      {subjectName}
    </h3>

    <p
      className="
        mt-1
        text-sm
        text-slate-500
      "
    >
      {subjectCode}
    </p>

    <p
      className="
        mt-2
        text-sm
        text-slate-600
      "
    >
      Semester {semester}
    </p>

  </div>

  <div className="mt-6">

    <p
      className="
        text-2xl
        font-bold
        text-slate-900
      "
    >
      ₹{price}
    </p>

    <div className="mt-4 flex gap-3">

      <Link
        to={`/subject/${slug}`}
        className="flex-1"
      >
        <Button
          variant="outline"
          className="w-full"
        >
          Preview
        </Button>
      </Link>

      <Button
        className="flex-1"
      >
        Buy Now
      </Button>

    </div>

  </div>
</Card>

);
};

export default SubjectPackCard;