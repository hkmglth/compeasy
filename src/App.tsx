import { useAuth } from "hooks";
import Auth from "layouts/Auth";
import Dashboard from "layouts/Dashboard/Dashboard";
import Login from "modules/Auth/Login";
import Register from "modules/Auth/Register";
import DashboardLanding from "modules/DashboardLanding/DashboardLanding";
import Landing from "modules/Landing/Landing";
import Page404 from "modules/Auth/Page404";
import { Navigate, Route, Routes } from "react-router-dom";
import Companies from "modules/Companies/Companies";
import CompaniesEdit from "modules/Companies/Edit/CompaniesEdit";
import Products from "modules/Products/Products";

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<Auth />}>
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
        <Route element={<Navigate to={"404"} />} path="*" />
        <Route element={<Page404 />} path="404" />
      </Route>
      {token && token.length > 0 && (
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardLanding />} />
          <Route path="profile" element={<DashboardLanding />} />
          <Route path="companies">
            <Route index element={<Companies />} />
            <Route path="edit/:companyId" element={<CompaniesEdit />} />
          </Route>
          <Route path="products">
            <Route index element={<Products />} />
            {/* <Route path=":companyId" element={<Products />} /> */}
            <Route path="edit/:productId" element={<DashboardLanding />} />
          </Route>
          <Route path="products/:companyId" element={<Products />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
