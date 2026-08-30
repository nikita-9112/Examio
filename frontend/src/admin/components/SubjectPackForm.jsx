import { useSubjectPackCreation } from "../contex/SubjectPackCreationContext";


const SubjectPackForm = ({
  mode="create",
  formData: externalFormData,
  onChange:externalOnChange,
})=>{

  // for create mode
  const context  = useSubjectPackCreation();
  const subjectPackData =  
  mode === "edit" ? externalFormData : context.subjectPackData;
 
  const handlechange = (e)=>{
    const {name, value, type, checked } = e.target;

    if(mode === "edit"){
      externalOnChange({
        [name]:type === "checkbox" ? checked : value,
      });
      return;
    }

    context.updateSubjectPackData({
      [name]:type === "checkbox"? checked: value,
    });
  };

  if(!subjectPackData) return null;

  return(
    <div className="space-y-8">

      {/* Basic information */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select the academic details for this SubjectPack.
          </p>
        </div>

        <div className="grid grid-cols-1 text-sm font-medium text-gray-700 mb-2">

          {/* university */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University
            </label>

            <select 
            name="university"
            value={subjectPackData.university || ""}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select University</option>
              <option value="RGPV">RGPV</option>
            </select>
          </div>

          {/* course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>

            <select  
            name="course"
            value={subjectPackData.course || ""} 
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
            </select>
          </div>

          {/* branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>

            <select name="branch"
            value={subjectPackData.branch || ""}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronic & Communication Engineering</option>
              <option value="ME">Mechanical Engineering</option>
            </select>
          </div>

          {/* semester */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>

            <select name="semester"
            value={subjectPackData.semester || ""}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map((semester) =>(
                <option key={semester} value={semester}>Semester {semester}</option>
              ))}
            </select>
          </div>

          {/* subject information */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 mt-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Subject Information</h2>

              <p className="text-sm text-gray-500 mt-1">
                Enter the details that identify this subject.
              </p>
            </div>

            <div className="space-y-5">

              {/* subject name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Name
                </label>
                <input type="text" name="subjectName" value={subjectPackData.subjectName || ""} onChange={handlechange}
                placeholder="e.g. Design and Analysis of Algorithems"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* subject code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Code
                </label>
                <input type="text" name="subjectCode" value={subjectPackData.subjectCode || ""} onChange={handlechange} 
                placeholder="e.g. CS-403"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description 
                  <span>(optional)</span>
                </label>

                <textarea  name="description" value={subjectPackData.description || ""} onChange={handlechange} rows={4} 
                placeholder="e.g. Briefly describe what this subject pack cintains..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          </section>
          
          {/* Pack Details */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 mt-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Pack Details
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Configure pricing and visibility.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    ₹ 
                  </span>
                  
                  <input type="number" name="price" min="0" value={subjectPackData.price ?? ""} defaultValue="20" onChange={handlechange} 
                  className="w-full  pl-9 pr-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <label className="flex items-center gap-3 h-[48px] cursor-pointer">
                  <input type="checkbox" name="isActive" checked={Boolean(subjectPackData.isActive)} onChange={handlechange} className="w-5 h-5 accent-blue-600"/>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Active
                    </p>
                    <p className="text-xs text-gray-500">
                      Make this subject Pack visible to students.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>

        </div>
      </section>
    </div>
  );
};

export default SubjectPackForm;