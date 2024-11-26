/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, LinearProgress } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import { LogbookForm } from "../../components/forms";
import * as actions from "../../redux/actions";

export default function CreateLogBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state.project);
  const me = useSelector((state) => state.me);
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });
  const params = useParams();

  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    dispatch(actions.getOneProject(params.id));

    return () => {};
  }, [params]);

  const handleCreate = async (data) => {
    try {
      setIsReady(false);
      dispatch(
        actions.createOneLogBook({
          ...data,
          project: project?._id,
          user: me?._id,
        })
      ).then(() => {
        navigate(-1);
      });
    } catch (error) {
      alert(`สร้าง Logbook ไม่สำเร็จ ${error.message}`);
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='เพิ่ม Logbook'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าหลัก", "โปรเจกต์", project?.name, "Logbook"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <LogbookForm control={control} />
          <div className='flex my-2'>
            <Button fullWidth color='primary' type='submit'>
              บันทึก
            </Button>
          </div>
        </form>
      </MainLayout>
    </div>
  );
}
