import { useDispatch } from "react-redux";
import { MainLayout, UserForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOneUser(data))
      .then((result) => {
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
      <MainLayout title='เพิ่มผู้ใช้งาน' currentPage='User' useBackButton>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <UserForm control={control} watch={watch} showPasswordInput />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
