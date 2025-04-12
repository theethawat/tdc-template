import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Paper } from "@mantine/core";
import { useParams } from "react-router";

export default function DetailGoods() {
  const dispatch = useDispatch();
  const goods = useSelector((state) => state.goods);
  const notify = useNotify();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOneGoods(params.id))
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
        isReady={ goods.isReady }
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "วัตถุดิบและสินค้า", link: "/inventory/goods" },
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
