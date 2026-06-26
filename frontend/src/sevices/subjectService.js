import api from "./api";

export const getAllSubjectPacks = async () =>{

  const response = await api.get("/subject-packs");
  return response.data;

}