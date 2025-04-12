import { useDispatch } from "react-redux";
import { MainLayout, GoodsTypeForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function CreateGoodsType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOneGoodsType(data))
      .then((result) => {
        notify.success({
          title: "เพิ่มประเภทวัตถุดิบและสินค้าสำเร็จ",
          message: "เพิ่มประเภทวัตถุดิบและสินค้าสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout title='เพิ่มประเภทวัตถุดิบและสินค้า' useBackButton        
      hirachyList={[
        { label: "หน้าหลัก", link: "/" },
        { label: "ประเภทวัตถุดิบและสินค้า", link: "/inventory/goods-type" },
      ]}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <GoodsTypeForm control={control} watch={watch} />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
