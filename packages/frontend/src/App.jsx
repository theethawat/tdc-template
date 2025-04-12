/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Auth,
  Home,
  Management,
  Utility,
  Inventory,
Crm,
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

             <Route path='inventory'>
                  <Route path='goods'>
    <Route path='create' element={<Inventory.CreateGoods />} />
    <Route path='edit/:id' element={<Inventory.EditGoods />} />
    <Route path='detail/:id' element={<Inventory.DetailGoods />} />
    <Route index element={<Inventory.ManagementGoods />} />
    </Route>
     <Route path='goods-type'>
    <Route path='create' element={<Inventory.CreateGoodsType />} />
    <Route path='edit/:id' element={<Inventory.EditGoodsType />} />
    <Route path='detail/:id' element={<Inventory.DetailGoodsType />} />
    <Route index element={<Inventory.ManagementGoodsType />} />
    </Route>
     {/** Script Place For New Route Inventory */}
                  <Route path='*' element={<Utility.Error404 />} />
                </Route> <Route path='crm'>
                  <Route path='customer'>
    <Route path='create' element={<Crm.CreateCustomer />} />
    <Route path='edit/:id' element={<Crm.EditCustomer />} />
    <Route path='detail/:id' element={<Crm.DetailCustomer />} />
    <Route index element={<Crm.ManagementCustomer />} />
    </Route>
     {/** Script Place For New Route Crm */}
                  <Route path='*' element={<Utility.Error404 />} />
                </Route>{/** Script Place For New Module */}
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
