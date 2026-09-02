import LibraryCard from "./LibraryCard";

import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import SkeletonCard from "../../ui/SkeletonCard";

const MyLibrary = ({
loading,
error,
library,
onRetry,
}) => {

return (


<section id="mylibrary">

  {/* Section Header */}

  <div className="mb-6 flex items-end justify-between gap-4">

    <div>

      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        My Library
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Access all the subject packs you have purchased.
      </p>

    </div>

    {library.length > 0 && (

      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">

        {library.length}{" "}
        {library.length === 1 ? "Pack" : "Packs"}

      </span>

    )}

  </div>


  {/* Loading */}

  {loading ? (

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3].map((item) => (

        <SkeletonCard key={item} />

      ))}

    </div>


  ) : error ? (

    <ErrorState
      message={error}
      onRetry={onRetry}
    />


  ) : library.length === 0 ? (

    <EmptyState
      title="Your library is empty"
      description="Purchase a subject pack to access solved previous year question papers."
    />


  ) : (

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {library.map((purchase) => (

        <LibraryCard
          key={purchase._id}
          pack={purchase}
        />

      ))}

    </div>

  )}

</section>


);

};

export default MyLibrary;
