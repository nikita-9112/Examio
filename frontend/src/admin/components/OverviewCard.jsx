

const OverviewCard = ({title, value, icon: Icon}) =>{

  return(

    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-between">

        <h3 className="text-gray-500 font-medium text-sm">
          {title}
        </h3>

        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-6 text-gray-900">
        {value }
      </h2>
    </div>
  )
}

export default OverviewCard;