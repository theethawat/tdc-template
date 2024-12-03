/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, LinearProgress } from "@mui/joy";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  faTrash,
  faPencil,
  faCalendar,
  faUser,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import _ from "lodash";
import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";
import { MarkdownRender } from "../../components/";

export default function DetailNotebook() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const notebook = useSelector((state) => state.notebook);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.getOneNotebook(params.id))
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err);
      });

    return () => {};
  }, [params]);

  useEffect(() => {
    if (notebook) {
      dispatch(actions.getOneProject(notebook?.project));
    }

    return () => {};
  }, [notebook]);

  const [isReady, setIsReady] = useState(true);

  const handleDelete = async () => {
    const confirm = window.confirm("คุณต้องการลบ Notebook นี้ใช่หรือไม่?");
    if (confirm) {
      try {
        dispatch(actions.deleteOneNotebook(params.id)).then(() => {
          navigate(-1);
        });
      } catch (error) {
        alert(`ลบ Notebook ไม่สำเร็จ ${error.message}`);
      }
    }
  };

  if (!isReady) {
    return <LinearProgress />;
  }

  return (
    <div>
      <MainLayout
        title={notebook?.title || "โปรเจกต์"}
        currentPage='Store'
        useBackButton
        hirachyList={["หน้าแรก", "โปรเจกต์", "Notebook"]}
        rightContainer={
          <div className='mr-2'>
            <Link to={`/project/notebook/edit/${notebook?._id}`}>
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
              onClick={handleDelete}
            >
              ลบ
            </Button>
          </div>
        }
      >
        <div className='mx-2'>
          <div className='font-display text-gray-500 my-2 flex gap-2 text-sm'>
            <div>
              <FontAwesomeIcon icon={faDiagramProject} />
              <span className='ml-2'>
                {_.truncate(project?.name, { length: 50 })}
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUser} />
              <span className='ml-2'>{notebook?.user?.name}</span>
            </div>
            <FontAwesomeIcon icon={faCalendar} />
            {dayjs(notebook?.date).format("D MMM YYYY")}
          </div>
          <MarkdownRender>{notebook?.description}</MarkdownRender>
        </div>
      </MainLayout>
    </div>
  );
}
