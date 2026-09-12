import api from "../../sevices/api";
import { getToken } from "../../utils/auth";

export const AdmingetAllSubjectPacks = async () =>{

  const response = await api.get("/admin/subject-packs");
  return response.data;

}
export const AdmingetSingleSubjectPack = async (id) =>{
  console.log(id);
  const response = await api.get(`/admin/subject-packs/${id}`);
  return response.data;
}

export const uploadPdf = async (file, folder = "papers") => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folder);

  const token = getToken();

  const response = await api.post(
    "/upload/pdf",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const addPaperToSubjectPack = async (
  packId,
  paperData
) => {
  const token = getToken();

  const response = await api.post(
    `/subject-packs/${packId}/papers`,
    paperData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);

  return response.data;
};


export const deletePaperFromSubjectPack = async (
  packId,
  paperId
) => {
  const token = getToken();

  const response = await api.delete(
    `/subject-packs/${packId}/papers/${paperId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPaper = async (subjectPackId, paperId) => {
  const response = await api.get(
    `/admin/paper/${subjectPackId}/${paperId}`,
    {
      responseType: "blob",
    }
  );
  console.log(response);

  return response.data;
};

export const getAdminDashboardStats = async() =>{

  const response = await api.get("/admin/dashboard/stats");
  console.log(response);
  return response.data;
}