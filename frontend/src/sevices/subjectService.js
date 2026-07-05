import api from "./api";

export const getAllSubjectPacks = async () =>{

  const response = await api.get("/subject-packs");
  return response.data;

}
export const getSingleSubjectPack = async (id) =>{
  console.log(id);
  const response = await api.get(`/subject-packs/${id}`);
  return response.data;
}