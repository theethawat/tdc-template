/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Auth, Home, Management, Project } from "./views";
import * as actions from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.meGet());
    return () => {};
  }, []);

  return (
    <div>
      <BrowserRouter>
        {window.localStorage.getItem("TDC_TOKEN") ? (
          <Routes>
            <Route path='management'>
              <Route path='user' element={<Management.ManagementUser />} />
            </Route>
            <Route path='project'>
              <Route index element={<Project.ManagementProject />} />
              <Route path='create' element={<Project.CreateProject />} />{" "}
              <Route path='detail/:id' element={<Project.DetailProject />} />
              <Route path='edit/:id' element={<Project.EditProject />} />
              <Route path='logbook/:id' element={<Project.ProjectLogBooks />} />
              <Route
                path='logbook/create/:id'
                element={<Project.CreateLogBook />}
              />{" "}
              <Route
                path='logbook/edit/:id'
                element={<Project.EditLogbook />}
              />
            </Route>
            <Route path='dashboard'>
              <Route index element={<div>dashboard index</div>} />
            </Route>
            <Route index element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route>
              <Route path='login' element={<Auth.Login />} />
              <Route index element={<Auth.Login />} />
              <Route path='*' element={<Auth.Login />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
