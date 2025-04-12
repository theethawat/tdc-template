import { useDispatch } from "react-redux";
import { MainLayout, CustomerForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function CreateCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOneCustomer(data))
      .then((result) => {
        notify.success({
          title: "เพิ่มคู่ค้าและลูกค้าสำเร็จ",
          message: "เพิ่มคู่ค้าและลูกค้าสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout title='เพิ่มคู่ค้าและลูกค้า' useBackButton        
      hirachyList={[
        { label: "หน้าหลัก", link: "/" },
        { label: "คู่ค้าและลูกค้า", link: "/crm/customer" },
      ]}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <CustomerForm control={control} watch={watch} />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
