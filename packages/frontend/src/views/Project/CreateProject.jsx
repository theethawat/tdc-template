/* eslint-disable no-alert */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, LinearProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";

import { MainLayout } from "../../components/layouts";
import { ProjectForm } from "../../components/forms";
import * as actions from "../../redux/actions";

export default function CreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [isReady, setIsReady] = useState(true);

  const handleCreate = async (data) => {
    try {
      setIsReady(false);
      dispatch(actions.createOneProject(data)).then(() => {
        navigate(-1);
      });
    } catch (error) {
      alert(`สร้างโปรเจกต์ไม่สำเร็จ ${error.message}`);
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title='เพิ่มโปรเจค'
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "รายการ"]}
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <ProjectForm control={control} />
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
