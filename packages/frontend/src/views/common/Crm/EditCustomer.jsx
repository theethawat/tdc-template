import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, CustomerForm, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router";

export default function EditCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);
  const { control, handleSubmit, watch } = useForm();
  const notify = useNotify();
  const params = useParams();

  const handleSubmitData = async (data) => {
    console.log("Data", data);
    dispatch(actions.updateOneCustomer(params.id, data))
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
        title='แก้ไขคู่ค้าและลูกค้า'
        useBackButton
        isReady={ customer.isReady }
        hirachyList={[
          { label: "หน้าหลัก", link: "/" },
          { label: "คู่ค้าและลูกค้า", link: "/crm/customer" },
        ]}
      >
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <CustomerForm control={control} watch={watch} defaultValue={ customer } />

          <div className='flex justify-end'>
            <Button type='submit'>บันทึก</Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
