import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Paper } from "@mantine/core";
import { useParams } from "react-router";

export default function DetailGoodsType() {
  const dispatch = useDispatch();
  const goodsType = useSelector((state) => state.goodsType);
  const notify = useNotify();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOneGoodsType(params.id))
      .then(() => {})
      .catch((err) => {
        notify.error({
          title: "ไม่สามารถโหลดข้อมูลได้",
          message: err.message,
        });
      });

    return () => {};
  }, [params]);

  return (
    <div>
      <MainLayout
        title='รายละเอียด'
        useBackButton
        isReady={ goodsType.isReady }
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "ประเภทวัตถุดิบและสินค้า", link: "/inventory/goods-type" },
        ]}
      >
        <Paper shadow='sm' p='xl'>
          <div className='flex flex-wrap'>
            <div className='w-full'>
              <b>ชื่อ : </b>
              {user?.name}
            </div>
          </div>
        </Paper>
      </MainLayout>
    </div>
  );
}
