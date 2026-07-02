
import { Inbox } from "lucide-react";


const EmptyState = ({
  title = "No Subject Packs Found",
  description = "New solved PYQs will be added soon. Please check back later.", 
})=>{

  return(
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
      <div className="mb-4 rounded-full bg-blue-100 p-4">
        <Inbox size={36} className="text-blue-600"/>
      </div>

      <h3 className="text-xl font-semibold text-slate-900"> 
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>
    </div>
  )
}


export default EmptyState;