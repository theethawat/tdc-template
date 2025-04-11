import { useDispatch } from "react-redux";
import { MainLayout, DepartmentForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function CreateDepartment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOneDepartment(data))
      .then((result) => {
        notify.success({
          title: "เพิ่มแผนกสำเร็จ",
          message: "เพิ่มแผนกสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout title='เพิ่มแผนก' useBackButton>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <DepartmentForm control={control} watch={watch} />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
