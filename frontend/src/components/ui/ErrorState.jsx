import { AlertCircle } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load the subject packs. Please try again.",
}) =>{

  return(

    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50  py-16 text-center">
      <div className="mb-4 rounded-full bg-red-100 p-4">

        <AlertCircle size={36} className="text-red-600"/>
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

export default ErrorState;