import { roles } from "../../../constants/constantFunction";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = ({ setHeaderImage }) => {
  return (
    <>
      {roles() ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard setHeaderImage={setHeaderImage} />
      )}
    </>
  );
};

export default Dashboard;
