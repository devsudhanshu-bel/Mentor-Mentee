
import asyncHandler from "../../../utils/asyncHandler.js";
import Service from "./studentProfile.service.js";

const dashboard = asyncHandler(async (req, res) => {
  const { studentId, resource } = req.params;
  const userId = req.user.id;

  const result =
    resource === "documents"
      ? await Service.getDocumentsDashboard(studentId, userId)
      : await Service.getDashboard(studentId, resource, userId);

  res.status(200).json(result);
});

const listDocuments = asyncHandler(async (req, res) => {
  const { studentId, resource } = req.params;
  const userId = req.user.id;

  if (resource === "attendance") {
    const result = await Service.getAttendance(
      studentId,
      req.query.semester
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  if (resource === "academics") {
    return res.status(200).json(
      await Service.getAcademics(studentId)
    );
  }

  if (resource === "meetings") {
    return res.status(200).json(
      await Service.getMeetings(studentId)
    );
  }

  if (resource === "documents") {
    return res.status(200).json(
      await Service.listDocuments(studentId, req.query, userId)
    );
  }

  if (
    [
      "research",
      "cocurricular",
      "extra-curricular",
      "awards-achievements",
      "certificates",
    ].includes(resource)
  ) {
    const categoryMap = {
      research: "RESEARCH",
      cocurricular: "CO_CURRICULAR",
      "extra-curricular": "EXTRA_CURRICULAR",
      "awards-achievements": "AWARDS",
      certificates: "CERTIFICATES",
    };

    return res.status(200).json(
      await Service.listDocuments(
        studentId,
        {
          ...req.query,
          category: categoryMap[resource],
        },
        userId
      )
    );
  }

  return res.status(400).json({
    success: false,
    message: "Unsupported student profile resource.",
  });
});

const getAcademicSemester = asyncHandler(async (req, res) => {
  const result = await Service.getAcademicSemester(
    req.params.studentId,
    req.params.semesterNumber
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getDocument = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.getDocument(
      req.params.studentId,
      req.params.documentId,
      req.params.resource,
      req.user.id
    )
  );
});

const reviewDocument = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.reviewDocument(
      req.params.studentId,
      req.params.documentId,
      req.params.resource,
      req.body,
      req.user.id
    )
  );
});

const getInternships = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.getInternships(
      req.params.studentId,
      req.user.id
    )
  );
});

const getInternshipQueue = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.getInternshipQueue(
      req.query.studentId,
      req.params.stage,
      req.user.id
    )
  );
});

const getInternshipById = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.getInternshipById(
      req.params.internshipId,
      req.user.id
    )
  );
});

const reviewInternship = asyncHandler(async (req, res) => {
  res.status(200).json(
    await Service.reviewInternship(
      req.params.internshipId,
      req.params.stage,
      req.body,
      req.user.id
    )
  );
});

export default {
  dashboard,
  listDocuments,
  getAcademicSemester,
  getDocument,
  reviewDocument,
  getInternships,
  getInternshipQueue,
  getInternshipById,
  reviewInternship,
};
