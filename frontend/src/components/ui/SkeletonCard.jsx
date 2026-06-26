

const SkeletonCard = ()=>{

  return(
    <div className="animate-pluse rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-4 h-6 w-3/4 rounded bg-slate-200"></div>

      <div className="mb-2 h-4 w-1/2 rounded bg-slate-200"></div>

      <div className="mb-4 h-4 w-2/3 rounded bg-slate-200"></div>

      <div className="mb-6 h-4 w-1/3 rounded bg-slate-200"></div>

      <div className="flex justify-between">
        <div className="h-10 w-24 rounded-lg bg-slate-200"></div>

        <div className="h-10 w-28 rounded-lg bg-slate-200"></div>
      </div>

    </div>
  )
}

export default SkeletonCard;