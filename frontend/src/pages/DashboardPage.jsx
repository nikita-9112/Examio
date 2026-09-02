import { useEffect, useState } from "react";

import MyLibrary from "../components/dashboard/Library/MyLibrary";
import Overview from "../components/dashboard/OverView/Overview";
import QuickStarts from "../components/dashboard/QuickStarts";

import purchaseService from "../sevices/purchaseService";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {

const { user } = useAuth();

const [library, setLibrary] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchLibrary = async () => {


try {

  setLoading(true);
  setError("");

  const res = await purchaseService.getMyPurchases();

  console.log("My Library:", res);

  if (!res?.success) {
    throw new Error(
      res?.message || "Failed to fetch your library."
    );
  }

  setLibrary(
    Array.isArray(res.purchases)
      ? res.purchases
      : []
  );

} catch (error) {

  console.error(error);

  setLibrary([]);

  setError(
    error?.response?.data?.message ||
    error?.message ||
    "Unable to load your library."
  );

} finally {

  setLoading(false);

}


};

useEffect(() => {


fetchLibrary();


}, []);

return (


<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

  {/* Dashboard Header */}

  <section className="mb-8">

    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">

      Welcome back
      {user?.name ? `, ${user.name}` : ""} 👋

    </h1>

    <p className="mt-2 text-sm text-slate-500 sm:text-base">

      Access your purchased subject packs and continue
      preparing for your exams.

    </p>

  </section>


  {/* Overview Statistics */}

  <Overview
    library={library}
    loading={loading}
    error={error}
  />


  {/* My Library */}

  <section className="mt-10">

    <MyLibrary
      library={library}
      loading={loading}
      error={error}
      onRetry={fetchLibrary}
    />

  </section>


  {/* Quick Starts */}

  <section className="mt-10">

    <QuickStarts />

  </section>

</main>


);

};

export default DashboardPage;
