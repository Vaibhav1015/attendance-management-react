import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../app/views/Auth/LogIn";
import Employee from "../app/views/Employee/Employee";
import Holiday from "../app/views/Holiday/Holiday";
import Dashboard from "../app/views/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Project from "../app/views/Project/Project";
import AdminLeaveList from "../app/views/AdminLeaveList/AdminLeaveList";
import EmployeeDashboard from "../app/views/Dashboard/EmployeeDashboard";
import Attendance from "../app/views/Attendance/Attendance";
import Student from "../app/views/Student/Student";
import StudentAttendance from "../app/views/StudentAttendance/StudentAttendance";

const AppRouter = ({ roles, setHeaderImage }) => {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard setHeaderImage={setHeaderImage} />}
        />
        {roles && <Route path="/employee" element={<Employee />} />}
        <Route path="/holiday-list" element={<Holiday />} />
        <Route path="/attendance-list" element={<Attendance />} />
        <Route path="/project" element={<Project />} />
        <Route path="/leave-list" element={<AdminLeaveList />} />
        <Route
          path="/admin-profile"
          element={<EmployeeDashboard setHeaderImage={setHeaderImage} />}
        />
        <Route path="/employee-info/:id" element={<EmployeeDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/student" element={<Student />} />
        <Route
          path="/attendance-list-student"
          element={<StudentAttendance />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
