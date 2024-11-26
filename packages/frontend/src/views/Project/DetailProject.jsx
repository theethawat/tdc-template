/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Card, LinearProgress } from "@mui/joy";
import { useNavigate, useParams, Link } from "react-router-dom";
import { faTrash, faPencil, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function DetailProject() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOneProject(params.id))
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err);
      });

    return () => {};
  }, [params]);

  const [isReady, setIsReady] = useState(true);

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title={project?.name || "โปรเจกต์"}
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "โปรเจกต์"]}
        rightContainer={
          <div className='mr-2'>
            <Link to={`/project/edit/${project?._id}`}>
              <Button
                color='warning'
                startDecorator={<FontAwesomeIcon icon={faPencil} />}
              >
                แก้ไข
              </Button>
            </Link>{" "}
            <Button
              color='danger'
              startDecorator={<FontAwesomeIcon icon={faTrash} />}
            >
              ลบ
            </Button>
          </div>
        }
      >
        <div className='mx-2'>
          <Card variant='plain'>
            <div className='flex flex-wrap '>
              <div className='w-full md:w-1/4 lg:w-1/5 p-2'>
                <div className='text-sm'>วันที่เริ่ม</div>
                <div className='text-lg font-semibold'>
                  {dayjs(project?.start_date).format("D MMM YYYY")}
                </div>
              </div>
              <div className='w-full md:w-1/4 lg:w-1/5 p-2'>
                <div className='text-sm'>วันที่สิ้นสุด</div>
                <div className='text-lg font-semibold'>
                  {dayjs(project?.expected_date).format("D MMM YYYY")}
                </div>
              </div>{" "}
              <div className='w-full md:w-1/4 lg:w-1/5 p-2'>
                <div className='text-sm'>สถานะ</div>
                <div className='text-lg font-semibold'>
                  {project?.completed ? "เสร็จสิ้น" : "ยังดำเนินการ"}
                </div>
              </div>
              <div className='w-full md:w-1/4 lg:w-1/5 p-2'>
                <div className='flex gap-1 justify-end'>
                  <Link to={`/project/logbook/${project?._id}`}>
                    <Button startDecorator={<FontAwesomeIcon icon={faBook} />}>
                      Log Book
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <div className='my-4'>
            <div className='font-display font-semibold text-sm'>รายละเอียด</div>
            <div>{project?.description}</div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
