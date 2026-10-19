import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ========================= AUTH ========================= */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/auth/ChangePassword";

/* ========================= PROTECTED ROUTE ========================= */
import ProtectedRoute from "./routes/ProtectedRoute";

/* ========================= COMMON ========================= */
import ScrollToTop from "./components/common/ScrollToTop";

/* ========================= STUDENT ========================= */
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Academics from "./pages/Academics";
import Attendance from "./pages/Attendance";
import Mentor from "./pages/Mentor";
import Internships from "./pages/Internships";
import Research from "./pages/Research";
import CoCurricular from "./pages/CoCurricular";
import ExtraCurricular from "./pages/ExtraCurricular";
import Awards from "./pages/Awards";
import Certificates from "./pages/Certificates";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";

/* ========================= MENTOR ========================= */
import MentorStudents from "./pages/Mentors/Students/Students";
import MentorMeetings from "./pages/Mentors/Meetings";
import MentorProfile from "./pages/Mentors/Profile";

/* ========================= MENTOR STUDENT PROFILE ========================= */
import StudentOverview from "./pages/Mentors/Students/Overview";
import StudentAcademics from "./pages/Mentors/Students/Academics";
import StudentAttendance from "./pages/Mentors/Students/Attendance";
import StudentInternships from "./pages/Mentors/Students/Internships";
import StudentResearch from "./pages/Mentors/Students/Research";
import StudentCoCurricular from "./pages/Mentors/Students/CoCurricular";
import MentorStudentExtraCurricular from "./pages/Mentors/Students/ExtraCurricular";
import StudentDocuments from "./pages/Mentors/Students/Documents";
import StudentCertificates from "./pages/Mentors/Students/Certificates";
import MentorStudentAwardsAchievements from "./pages/Mentors/Students/AwardsAchievements";

/* ========================= ADMIN ========================= */
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminMentors from "./pages/Admin/Mentors";
import AdminStudents from "./pages/Admin/Students";
import MentorDetails from "./pages/Admin/MentorDetails";
import AdminStudentDetails from "./pages/Admin/AdminStudentDetails";
import AdminStudentAcademics from "./pages/Admin/AdminStudentAcademics";
import AdminStudentAttendance from "./pages/Admin/AdminStudentAttendance";
import AdminStudentInternships from "./pages/Admin/AdminStudentInternships";
import AdminStudentResearch from "./pages/Admin/AdminStudentResearch";
import AdminStudentCoCurricular from "./pages/Admin/AdminStudentCoCurricular";
import AdminStudentDocuments from "./pages/Admin/AdminStudentDocuments";
import AdminStudentCertificates from "./pages/Admin/AdminStudentCertificates";
import AdminStudentExtraCurricular from "./pages/Admin/AdminStudentExtraCurricular";
import AdminStudentAwardsAchievements from "./pages/Admin/AdminStudentAwardsAchievements";
import Assignments from "./pages/Admin/Assignments";
import AdminProfile from "./pages/Admin/Profile";
import AdminAnnouncements from "./pages/Admin/Announcements";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* ========================= DEFAULT ========================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ========================= AUTH ========================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========================= CHANGE PASSWORD ========================= */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["STUDENT"]}
              allowPasswordChange={true}
            />
          }
        >
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* ========================= STUDENT ROUTES ========================= */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/academics" element={<Academics />} />
          <Route path="/student/attendance" element={<Attendance />} />
          <Route path="/student/mentor-meetings" element={<Mentor />} />
          <Route path="/student/internships" element={<Internships />} />
          <Route path="/student/research" element={<Research />} />
          <Route path="/student/co-curricular" element={<CoCurricular />} />
          <Route
            path="/student/extra-curricular"
            element={<ExtraCurricular />}
          />
          <Route path="/student/awards" element={<Awards />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/documents" element={<Documents />} />
          <Route path="/student/settings" element={<Settings />} />
        </Route>

        {/* ========================= MENTOR ROUTES ========================= */}
        <Route element={<ProtectedRoute allowedRoles={["MENTOR"]} />}>
          <Route
            path="/mentor/dashboard"
            element={<Navigate to="/mentor/students" replace />}
          />
          <Route path="/mentor/students" element={<MentorStudents />} />

          <Route
            path="/mentor/students/:id/overview"
            element={<StudentOverview />}
          />
          <Route
            path="/mentor/students/:id/academics"
            element={<StudentAcademics />}
          />
          <Route
            path="/mentor/students/:id/attendance"
            element={<StudentAttendance />}
          />
          <Route
            path="/mentor/students/:id/internships"
            element={<StudentInternships />}
          />
          <Route
            path="/mentor/students/:id/research"
            element={<StudentResearch />}
          />
          <Route
            path="/mentor/students/:id/co-curricular"
            element={<StudentCoCurricular />}
          />
          <Route
            path="/mentor/students/:id/extra-curricular"
            element={<MentorStudentExtraCurricular />}
          />
          <Route
            path="/mentor/students/:id/documents"
            element={<StudentDocuments />}
          />
          <Route
            path="/mentor/students/:id/certificates"
            element={<StudentCertificates />}
          />
          <Route
            path="/mentor/students/:id/awards-achievements"
            element={<MentorStudentAwardsAchievements />}
          />

          <Route path="/mentor/meetings" element={<MentorMeetings />} />
          <Route path="/mentor/profile" element={<MentorProfile />} />
        </Route>

        {/* ========================= ADMIN ROUTES ========================= */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/mentors" element={<AdminMentors />} />
          <Route path="/admin/students" element={<AdminStudents />} />

          <Route path="/admin/mentor/:mentorId" element={<MentorDetails />} />

          {/* Legacy mentor-scoped Admin student profile URLs */}
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/overview"
            element={<AdminStudentDetails />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/academics"
            element={<AdminStudentAcademics />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/attendance"
            element={<AdminStudentAttendance />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/internships"
            element={<AdminStudentInternships />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/research"
            element={<AdminStudentResearch />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/co-curricular"
            element={<AdminStudentCoCurricular />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/documents"
            element={<AdminStudentDocuments />}
          />
          <Route
            path="/admin/mentor/:mentorId/student/:studentId/certificates"
            element={<AdminStudentCertificates />}
          />

          {/* Direct Admin student profile routes */}
          <Route
            path="/admin/overview/students/:id"
            element={<StudentOverview />}
          />
          <Route
            path="/admin/overview/students/:id/academics"
            element={<AdminStudentAcademics />}
          />
          <Route
            path="/admin/overview/students/:id/attendance"
            element={<AdminStudentAttendance />}
          />
          <Route
            path="/admin/overview/students/:id/internships"
            element={<AdminStudentInternships />}
          />
          <Route
            path="/admin/overview/students/:id/research"
            element={<AdminStudentResearch />}
          />
          <Route
            path="/admin/overview/students/:id/co-curricular"
            element={<AdminStudentCoCurricular />}
          />
          <Route
            path="/admin/overview/students/:id/extra-curricular"
            element={<AdminStudentExtraCurricular />}
          />
          <Route
            path="/admin/overview/students/:id/awards-achievements"
            element={<AdminStudentAwardsAchievements />}
          />
          <Route
            path="/admin/overview/students/:id/documents"
            element={<AdminStudentDocuments />}
          />
          <Route
            path="/admin/overview/students/:id/certificates"
            element={<AdminStudentCertificates />}
          />

          <Route path="/admin/assignments" element={<Assignments />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/admin-profile" element={<AdminProfile />} />
        </Route>

        {/* ========================= 404 ========================= */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
