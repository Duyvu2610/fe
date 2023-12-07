import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import StudentList from "./pages/StudentList";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          ></Route>
          <Route
            path="/students"
            element={
              <Layout>
                <StudentList />
              </Layout>
            }
          ></Route>
          <Route
            path="/students/edit"
            element={
              <Layout>
                <EditStudent />
              </Layout>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
