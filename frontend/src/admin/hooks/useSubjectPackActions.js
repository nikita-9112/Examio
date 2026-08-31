import { useState } from "react";
import api from "../../sevices/api";
import { getToken } from "../../utils/auth";

const useSubjectPackActions = () => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSubjectPackStatus = async (pack) => {
    try {
      setIsToggling(true);

      const token = getToken();

      const response = await api.put(
        `/subject-packs/${pack._id}`,
        {
          isActive: !pack.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(
          data.message || "Failed to update subject pack status"
        );
      }

      return data.data;

    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Failed to update subject pack status"
      );
    } finally {
      setIsToggling(false);
    }
  };


  const deleteSubjectPack = async (packId) => {
    try {
      setIsDeleting(true);

      const token = getToken();

      // IMPORTANT:
      // Replace this route with your exact existing delete route
      const response = await api.delete(
        `/subject-packs/${packId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      const data = response.data;

      if (!data.success) {
        throw new Error(
          data.message || "Failed to delete subject pack"
        );
      }

      return data;

    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete subject pack"
      );
    } finally {
      setIsDeleting(false);
    }
  };


  return {
    toggleSubjectPackStatus,
    deleteSubjectPack,
    isToggling,
    isDeleting,
  };
};

export default useSubjectPackActions;