/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, LinearProgress } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import { LogbookForm } from "../../components/forms";
import * as actions from "../../redux/actions";

export default function EditLogbook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logbook = useSelector((state) => state.logbook);
  const me = useSelector((state) => state.me);
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });
  const params = useParams();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(actions.getOneLogBook(params.id)).then(() => {
      setIsReady(true);
    });

    return () => {};
  }, [params]);

  const handleCreate = async (data) => {
    try {
      setIsReady(false);
      dispatch(
        actions.updateOneLogBook(logbook?._id, { ...data, user: me?._id })
      ).then(() => {
        navigate(-1);
      });
    } catch (error) {
      alert(`แก้ไข Logbook ไม่สำเร็จ ${error.message}`);
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='แก้ไข Logbook'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าหลัก", "โปรเจกต์", "Logbook"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <LogbookForm control={control} defaultValue={logbook} />
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
