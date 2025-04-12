import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, DepartmentForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router";

export default function EditDepartment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const department = useSelector((state) => state.department);
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();
  const params = useParams();

  const handleSubmitData = async (data) => {
    console.log("Data", data);
    dispatch(actions.updateOneDepartment(params.id, data))
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
    dispatch(actions.getOneDepartment(params.id))
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
        title='แก้ไขแผนก'
        useBackButton
        isReady={department.isReady}
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "แผนก", link: "/management/deparment" },
        ]}
      >
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <DepartmentForm
            control={control}
            watch={watch}
            defaultValue={department}
          />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
