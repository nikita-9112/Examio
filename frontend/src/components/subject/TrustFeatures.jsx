import { Clock3, Download, Lock, ShieldCheck } from "lucide-react";




const trustFeatrues = [
  {
    id:1,
    icon: ShieldCheck,
    title: "100% Acurate",
    description: "Verified & accurate papers",
  },
  {
    id:2,
    icon: Download,
    title: "Instant Access",
    description: "Download immediately after purchase",
  },
  {
    id:3,
    icon: Lock,
    title: "Secure Payment",
    description: "Safe & encrypted transactions",
  },
  {
    id:4,
    icon: Clock3,
    title: "Always Updated",
    description: "Latest papers added regularly",
  },
 
];


const TrustFeature = ()=>{

  return(
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Why Choose Examio?
        </h2>

        <p className="mt-1  text-sm text-slate-500">
          Everything you need for a smooth and reliable exam preparation.
        </p>
      </div>

      <div className="grid grid-colss-1 gap-4 sm:grid-cols-2">
        {trustFeatrues.map((feature)=>{
          const Icon = feature.icon;
          return (
            <div key={feature.id}
            className="flex item-start gap-4 rounded-2xl border border-slate-200  bg-slate-50 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-white">

              <div className="rounded-xl bg-blue-100 p-3">
                <Icon className="h-6 w-6 text-blue-600"/>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrustFeature;