import {Routes, Route} from "react-router-dom"

import { SubjectPackCreationProvider } from "../admin/contex/SubjectPackCreationContext";

import AdminLayout from "../admin/layouts/AdminLayout"
import Dashboard from '../admin/pages/Dashboard';
import SubjectPacks from '../admin/pages/SubjectPacks';
import ManagePapers from '../admin/pages/ManagePapers';
import AddSubjectPack from '../admin/pages/AddSubjectPack';
import AddDemoPdfPage from '../admin/pages/AddDemoPdfPage';
import EditSubjectPack from "../admin/pages/EditSubjectPack";


const AdminRoutes = () =>{
  return(
    <SubjectPackCreationProvider>

      <Routes>

        <Route path="/" element={<AdminLayout />}>

              <Route index element={<Dashboard/>} />
              <Route path='subject-packs' element={<SubjectPacks/>} />
              <Route path='subject-packs/:id' element={<ManagePapers/>} />
              <Route path="subject-packs/:id/edit" element={<EditSubjectPack/>}/>
              <Route path='subject-pack/new' element={<AddSubjectPack/>}/>
              <Route path='subject-pack/new-demo' element={<AddDemoPdfPage/>}/>
          
        </Route>
      </Routes>
    </SubjectPackCreationProvider>
  )
}

export default AdminRoutes;