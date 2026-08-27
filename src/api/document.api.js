import api from "./axios";

// ==========================================================
// UPLOAD DOCUMENT
// ==========================================================

export const uploadDocument = async ({
  documentName,
  category,
  description,
  file,
}) => {
  if (!documentName) {
    throw new Error("Document name is required.");
  }

  if (!category) {
    throw new Error("Document category is required.");
  }

  if (!file) {
    throw new Error("File is required.");
  }

  const formData = new FormData();

  formData.append("documentName", documentName);
  formData.append("category", category);

  if (description) {
    formData.append("description", description);
  }

  formData.append("document", file);

  const response = await api.post(
    "/mentee/documents",
    formData
  );

  return response.data;
};

// ==========================================================
// GET DOCUMENT DASHBOARD
// ==========================================================

export const getDocumentsDashboard = async (
  category = null
) => {
  const params = {};

  if (category) {
    params.category = category;
  }

  const response = await api.get(
    "/mentee/documents/dashboard",
    {
      params,
    }
  );

  return response.data?.data;
};

// ==========================================================
// GET RESEARCH DOCUMENTS
// ==========================================================

export const getResearchDocuments = async () => {
  return getDocumentsDashboard("RESEARCH");
};

// ==========================================================
// GET CO-CURRICULAR DOCUMENTS
// ==========================================================

export const getCoCurricularDocuments = async () => {
  return getDocumentsDashboard("CO_CURRICULAR");
};

// ==========================================================
// GET SINGLE DOCUMENT
// ==========================================================

export const getDocumentById = async (
  documentId
) => {
  if (!documentId) {
    throw new Error("Document ID is required.");
  }

  const response = await api.get(
    `/mentee/documents/${documentId}`
  );

  return response.data?.data;
};

// ==========================================================
// UPDATE DOCUMENT
// ==========================================================

export const updateDocument = async ({
  documentId,
  documentName,
  category,
  description,
  file,
}) => {
  if (!documentId) {
    throw new Error("Document ID is required.");
  }

  const formData = new FormData();

  if (documentName !== undefined) {
    formData.append(
      "documentName",
      documentName
    );
  }

  if (category !== undefined) {
    formData.append(
      "category",
      category
    );
  }

  if (description !== undefined) {
    formData.append(
      "description",
      description
    );
  }

  if (file) {
    formData.append(
      "document",
      file
    );
  }

  const response = await api.put(
    `/mentee/documents/${documentId}`,
    formData
  );

  return response.data;
};

// ==========================================================
// DELETE DOCUMENT
// ==========================================================

export const deleteDocument = async (
  documentId
) => {
  if (!documentId) {
    throw new Error(
      "Document ID is required."
    );
  }

  console.log(
    "========================================"
  );

  console.log(
    "DELETE DOCUMENT REQUEST"
  );

  console.log(
    "Document ID:",
    documentId
  );

  console.log(
    "DELETE URL:",
    `/mentee/documents/${documentId}`
  );

  console.log(
    "========================================"
  );

  try {
    const response = await api.delete(
      `/mentee/documents/${documentId}`
    );

    console.log(
      "DELETE DOCUMENT SUCCESS:",
      response
    );

    return response.data;
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "DELETE DOCUMENT FAILED"
    );

    console.error(
      "Status:",
      error?.response?.status
    );

    console.error(
      "Response:",
      error?.response?.data
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "========================================"
    );

    throw error;
  }
};