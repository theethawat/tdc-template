import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout, UserForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button, Switch } from "@mantine/core";
import { useNavigate } from "react-router";
import { generate as wordRandom } from "random-words";

import _ from "lodash";

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();
  const [enableLogin, setEnableLogin] = useState(true);
  const department = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(actions.getAllDepartment({}));

    return () => {};
  }, []);

  const handleSubmitData = async (data) => {
    const payload = data;

    // ใส่กันไว้ เนื่้องจากล็อกว่า username must unique
    if (!enableLogin) {
      const firstName = _.split(data.name, " ")?.[0] || "";
      const randomSuffix = wordRandom({ exactly: 2, join: "-" });
      payload.username = firstName + randomSuffix;
      payload.password = "";
      payload.allowLogin = false;
    }

    dispatch(actions.createOneUser(payload))
      .then(() => {
        notify.success({
          title: "เพิ่มผู้ใช้งานสำเร็จ",
          message: "เพิ่มผู้ใช้งานสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout
        title='เพิ่มผู้ใช้งาน'
        currentPage='User'
        useBackButton
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "ผู้ใช้งาน", link: "/management/user" },
        ]}
      >
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Switch
            defaultChecked
            checked={enableLogin}
            onChange={(e) => setEnableLogin(e.target.checked)}
            label='สร้างให้สามารถ Login ได้'
          />
          <UserForm
            control={control}
            watch={watch}
            showPasswordInput={enableLogin}
            departments={department?.rows}
          />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
