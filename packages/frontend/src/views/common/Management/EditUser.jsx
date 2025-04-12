import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, UserForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const department = useSelector((state) => state.department);
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();
  const params = useParams();

  const handleSubmitData = async (data) => {
    console.log("Data", data);
    dispatch(actions.updateOneUser(params.id, data))
      .then(() => {
        notify.success({
          title: "แก้ไขสำเร็จ",
          message: "แก้ไขสำเร็จ",
        });
        navigate(-1);
      })
      .catch((error) => {
        notify.error({ title: "แก้ไขไม่สำเร็จ", message: error.message });
      });
  };

  useEffect(() => {
    dispatch(actions.getAllDepartment({}));
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
        title='แก้ไขผู้ใช้งาน'
        currentPage='User'
        useBackButton
        // ใส่สถานะไว้ ระบบจะขึ้น Loading เป็นอัตโนมัติถ้ามันยังไม่ Ready
        isReady={user.isReady}
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "ผู้ใช้งาน", link: "/management/user" },
        ]}
      >
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <UserForm
            control={control}
            watch={watch}
            defaultValue={user}
            departments={department?.rows}
          />
          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
