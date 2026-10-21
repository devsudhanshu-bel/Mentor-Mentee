import ProjectsService from "../services/projects.service.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";
class ProjectsController {
  listStudentProjects = asyncHandler(async (req, res) => { const data = await ProjectsService.listStudentProjects(req.user.id, req.params.studentId); return res.status(200).json(new ApiResponse(200, "Student projects fetched successfully", data)); });
  createProject = asyncHandler(async (req, res) => { const project = await ProjectsService.createProject(req.user.id, req.params.studentId, req.body || {}); return res.status(201).json(new ApiResponse(201, "Project assigned successfully", project)); });
  getMessages = asyncHandler(async (req, res) => { const messages = await ProjectsService.getProjectMessages(req.user.id, req.params.projectId); return res.status(200).json(new ApiResponse(200, "Project messages fetched", { messages })); });
  sendMessage = asyncHandler(async (req, res) => { const message = await ProjectsService.sendProjectMessage(req.user.id, req.params.projectId, req.body || {}); return res.status(201).json(new ApiResponse(201, "Message sent", message)); });
  updateStatus = asyncHandler(async (req, res) => { const project = await ProjectsService.updateProjectStatus(req.user.id, req.params.projectId, req.body?.status); return res.status(200).json(new ApiResponse(200, "Project status updated successfully", project)); });
}
export default new ProjectsController();
