import { Route, Routes } from "react-router-dom";
import { AuthRefresh } from "./bootstrap/auth-refresh";
import Admin from "./page/admin";
import Doctor from "./page/doctor";
import Reception from "./page/reception";
import Login from "./page/login";
import { RoleRoute } from "./routes/role-route";

function App() {
  return (
     <AuthRefresh>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RoleRoute roles={["admin"]}>
                <Admin />
              </RoleRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <RoleRoute roles={["doctor"]}>
                <Doctor />
              </RoleRoute>
            }
          />
          <Route
            path="/reception"
            element={
              <RoleRoute roles={["reception"]}>
                <Reception />
              </RoleRoute>
            }
          />               
      </Routes>
     </AuthRefresh>
  );
}

export default App;
