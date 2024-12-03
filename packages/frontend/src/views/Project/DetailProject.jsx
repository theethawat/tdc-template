/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Card, LinearProgress } from "@mui/joy";
import { List, Avatar } from "antd";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  faTrash,
  faPencil,
  faBook,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import _ from "lodash";
import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function DetailProject() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const notebook = useSelector((state) => state.notebook);
  const params = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(actions.getOneProject(params.id))
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err);
      });

    dispatch(actions.getAllNotebook({ project: params.id, page: 1, size: 5 }));

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
          <div className='my-2'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/2 pr-1'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold font-display text-lg'>
                    Notebook
                  </h2>
                  <div className='flex gap-1'>
                    <Link to={`/project/notebook/${project?._id}`}>
                      <Button
                        startDecorator={<FontAwesomeIcon icon={faBook} />}
                      >
                        ดูทั้งหมด
                      </Button>
                    </Link>
                    <Link to={`/project/notebook/create/${project?._id}`}>
                      <Button
                        startDecorator={<FontAwesomeIcon icon={faAdd} />}
                        color='neutral'
                      >
                        เพิ่ม
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className='my-2'>
                  <List
                    itemLayout='vertical'
                    size='large'
                    pagination={{
                      onChange: (tempPage) => {
                        setPage(tempPage);
                      },
                      pageSize: 5,
                    }}
                    bordered
                    dataSource={notebook?.rows}
                    renderItem={(item) => (
                      <List.Item key={item.title}>
                        <List.Item.Meta
                          avatar={<Avatar>{_.first(item.user?.name)}</Avatar>}
                          title={
                            <Link to={`/project/notebook/detail/${item._id}`}>
                              {item.title}
                            </Link>
                          }
                          description={dayjs(item.date).format("D MMM YYYY")}
                        />
                        {_.truncate(item.description, { length: 100 })}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
