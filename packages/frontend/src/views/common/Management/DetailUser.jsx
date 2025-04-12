import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Paper } from "@mantine/core";
import { useParams } from "react-router";

export default function DetailUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notify = useNotify();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOneUser(params.id))
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
        title='รายละเอียดผู้ใช้งาน'
        currentPage='User'
        useBackButton
        isReady={user.isReady}
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "ผู้ใช้งาน", link: "/management/user" },
        ]}
      >
        <Paper shadow='sm' p='xl'>
          <div className='flex flex-wrap'>
            <div className='w-full'>
              <b>ชื่อ-นามสกุล : </b>
              {user?.name}
            </div>
          </div>
        </Paper>
      </MainLayout>
    </div>
  );
}
