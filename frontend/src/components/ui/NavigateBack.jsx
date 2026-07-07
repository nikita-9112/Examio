import { ArrowLeft} from "lucide-react";

const NavigateBack = ()=>{

  return(
    <button onClick={()=> navigate(-1)} 
    className="mb-6 flex items-center gap-2 tex-blue-600 hover: text-blue-700">
      <ArrowLeft size={20} />
    </button>
  )
}

export default NavigateBack;