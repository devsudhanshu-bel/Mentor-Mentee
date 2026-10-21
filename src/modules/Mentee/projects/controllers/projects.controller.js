import asyncHandler from "../../../../utils/asyncHandler.js";
import ApiResponse from "../../../../utils/ApiResponse.js";
import StudentProjectsService from "../services/projects.service.js";

class StudentProjectsController {
  getUnreadCount = asyncHandler(async (req, res) => {
    const data = await StudentProjectsService.getUnreadCount(req.user.id);
    return res.status(200).json(new ApiResponse(200, "Unread project count fetched", data));
  });

  listMyProjects = asyncHandler(async (req, res) => {
    const data = await StudentProjectsService.listMyProjects(req.user.id);
    return res.status(200).json(new ApiResponse(200, "Student projects fetched", data));
  });

  getMessages = asyncHandler(async (req, res) => { const messages = await StudentProjectsService.getProjectMessages(req.user.id, req.params.projectId); return res.status(200).json(new ApiResponse(200, "Project messages fetched", { messages })); });

  sendMessage = asyncHandler(async (req, res) => { const message = await StudentProjectsService.sendProjectMessage(req.user.id, req.params.projectId, req.body || {}); return res.status(201).json(new ApiResponse(201, "Message sent", message)); });

  submitProject = asyncHandler(async (req, res) => {
    const project = await StudentProjectsService.submitProject(req.user.id, req.params.projectId, req.file, req.body?.message);
    return res.status(200).json(new ApiResponse(200, "Project work submitted successfully", project));
  });
}

export default new StudentProjectsController();
