/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Auth,
  Home,
  Management,
  Utility,
  /** Script Import New View */
} from "./views";
import * as actions from "./redux/actions";

{
  /** ห้ามลบคอมเมนต์ Script Place For New Route 
   * Script Import New View ,
  และ Script Place For New Module นะครับ 
  ผูกกับ Script เอาไว้*/
}
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.meGet());
    return () => {};
  }, []);

  return (
    <div>
      <BrowserRouter>
        {window.localStorage.getItem("APP_TOKEN") ? (
          <Routes>
            <Route path='login' element={<Auth.Login />} />
            <Route path='management'>
              <Route path='user' element={<Management.ManagementUser />} />
              <Route path='user/create' element={<Management.CreateUser />} />
              <Route path='user/edit/:id' element={<Management.EditUser />} />
              <Route
                path='user/edit-password/:id'
                element={<Management.EditPassword />}
              />
              <Route
                path='user/detail/:id'
                element={<Management.DetailUser />}
              />
              {/** Script Place For New Route Management */}
              <Route path='*' element={<Utility.Error404 />} />
            </Route>

            {/** Script Place For New Module */}
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
