import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Paper } from "@mantine/core";
import { useParams } from "react-router";

export default function DetailCustomer() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const notify = useNotify();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOneCustomer(params.id))
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
        isReady={ customer.isReady }
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "คู่ค้าและลูกค้า", link: "/crm/customer" },
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
