import { Route, Routes } from "react-router-dom";
import paths from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Dashboard, Login, NotFound, Register } from "./pages";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path={paths.dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
