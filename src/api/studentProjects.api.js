import api from "./axios";
const unwrap = (response) => { let value = response?.data ?? response; for (let i=0;i<4;i+=1) { if (value && !Array.isArray(value) && value.data !== undefined) value=value.data; else break; } return value; };
const studentProjectsApi = {
 async getUnreadCount(){ const data=unwrap(await api.get("/mentee/projects/unread-count")); return Number(data?.unreadCount ?? 0); },
 async getMyProjects(){ const data=unwrap(await api.get("/mentee/projects")); return Array.isArray(data?.projects)?data.projects:[]; },
 async submitProject(projectId,file,message=""){ const formData=new FormData(); formData.append("file",file); if(message.trim()) formData.append("message",message.trim()); return unwrap(await api.post(`/mentee/projects/${encodeURIComponent(projectId)}/submission`,formData,{headers:{"Content-Type":"multipart/form-data"},timeout:120000})); },
 async getProjectMessages(projectId){ const data=unwrap(await api.get(`/mentee/projects/${encodeURIComponent(projectId)}/messages`)); return Array.isArray(data?.messages)?data.messages:[]; },
 async sendProjectMessage(projectId,message){ return unwrap(await api.post(`/mentee/projects/${encodeURIComponent(projectId)}/messages`,{message})); }
};
export default studentProjectsApi;
