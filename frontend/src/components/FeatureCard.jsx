import Card from "./ui/Card"


const FeatureCard = ({icon:Icon, title, description}) =>{

  return(
    <Card className="text-center">
      
    <div className=" mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all group-hover:scale-110 ">
     <Icon size={28}/>
    </div>
    <h3 className="text-xl font-semibold text-slate-900">
      {title}
    </h3>
    <p className="mt-3 text-slate-600">
      {description}
    </p>
    </Card>
  );
};

export default FeatureCard;