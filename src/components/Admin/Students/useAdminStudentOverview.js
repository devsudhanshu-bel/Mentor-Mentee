import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";

const useAdminStudentOverview = () => {
  const { studentId } = useParams();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverview = useCallback(async () => {
    if (!studentId) {
      setOverview(null);
      setError("Student ID is missing from the URL.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.get(
        `/admin/students/${encodeURIComponent(studentId)}/overview`,
      );

      // Supports the project's ApiResponse envelope.
      const payload = response.data?.data ?? response.data;

      if (!payload || !payload.student) {
        throw new Error("The API response does not contain student details.");
      }

      setOverview(payload);
    } catch (err) {
      console.error("Failed to fetch student overview:", err);

      setOverview(null);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load this student's details.",
      );
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    overview,
    loading,
    error,
    refresh: fetchOverview,
  };
};

export default useAdminStudentOverview;
