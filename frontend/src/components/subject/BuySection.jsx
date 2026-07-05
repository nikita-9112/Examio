import Button from "../ui/Button";


const BuySection = ({subjectPack})=>{


  const handleBuy = async()=>{

  }

  const papersCount = subjectPack?.papers?.length ?? 0;
  return(
    <section className="rounded-t-2xl border border-slate-200 bg-white p-5 shadow-lg sticky bottom-0 z-30 ">
      
      <div className="flex gap-4 items-center justify-evenly ">

    {/* left part */}

    {/* price info */}
        <div>
          <p className="text-sm text-slate-500">
            Only
          </p>
          <h2 className="text-3xl font-bold text-blue-700">
            ₹{subjectPack?.price ?? 0}
          </h2>
        </div>

{/* some information only for desktop screen */}
        <div className="hidden  md:block">
          <p className="font-semibold text-late-900">
            {papersCount} previous Year Papers
          </p>
          
          <p className="mt-1 text-sm text-slate-500">
            Includes solved exam papers
          </p>
        </div>

        {/* buy section */}

        <Button size="lg"
        className="shrink-0 h-12 rounded-2xl px-6 font-semibold"
        onClick={handleBuy}>
          Unlock Full Pack
        </Button>
      </div>
    </section>
  )
}


export default BuySection;