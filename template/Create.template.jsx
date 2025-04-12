import { useDispatch } from "react-redux";
import { MainLayout, {{modelName}}Form, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function Create{{modelName}}() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOne{{modelName}}(data))
      .then((result) => {
        notify.success({
          title: "เพิ่ม{{thaiName}}สำเร็จ",
          message: "เพิ่ม{{thaiName}}สำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout title='เพิ่ม{{thaiName}}' useBackButton        
      hirachyList={[
        { label: "หน้าหลัก", link: "/" },
        { label: "{{thaiName}}", link: "/{{moduleRouterName}}/{{routerName}}" },
      ]}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <{{modelName}}Form control={control} watch={watch} />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
