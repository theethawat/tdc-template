import { useDispatch } from "react-redux";
import { MainLayout, GoodsForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

import _ from "lodash";

export default function CreateGoods() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();

  const handleSubmitData = async (data) => {
    dispatch(actions.createOneGoods(data))
      .then((result) => {
        notify.success({
          title: "เพิ่มวัตถุดิบและสินค้าสำเร็จ",
          message: "เพิ่มวัตถุดิบและสินค้าสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "เพิ่มผู้ใช้ไม่สำเร็จ", message: error.message });
      });
  };
  return (
    <div>
      <MainLayout title='เพิ่มวัตถุดิบและสินค้า' useBackButton        
      hirachyList={[
        { label: "หน้าหลัก", link: "/" },
        { label: "วัตถุดิบและสินค้า", link: "/inventory/goods" },
      ]}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <GoodsForm control={control} watch={watch} />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
