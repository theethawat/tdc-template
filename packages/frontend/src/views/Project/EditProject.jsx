/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, LinearProgress } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import { ProjectForm } from "../../components/forms";
import * as actions from "../../redux/actions";

export default function EditProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const project = useSelector((state) => state.project);
  const { control, handleSubmit } = useForm();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(actions.getOneProject(params.id))
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err.message);
      });

    return () => {};
  }, [params]);

  const handleCreate = async (data) => {
    try {
      setIsReady(false);
      dispatch(actions.updateOneProject(params.id, data)).then(() => {
        navigate(-1);
      });
    } catch (error) {
      alert(`แก้ไขโปรเจกต์ไม่สำเร็จ ${error.message}`);
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='แก้ไขโปรเจกต์'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "โปรเจกต์"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <ProjectForm control={control} defaultValue={project} />
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
