/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "dayjs/locale/th";
import {
  Button,
  LinearProgress,
  Typography,
  Card,
  ButtonGroup,
  Switch,
  Avatar,
} from "@mui/joy";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { DatePicker } from "antd";

import { MainLayout } from "../../components/layouts";
import { MarkdownRender } from "../../components";
import * as actions from "../../redux/actions";
import dayjs from "dayjs";

dayjs.locale("th");

const { RangePicker } = DatePicker;

export default function ProjectLogBooks() {
  const [isReady, setIsReady] = useState(false);
  const project = useSelector((state) => state.project);
  const logbook = useSelector((state) => state.logbook);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [enableFilter, setEnableFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const getAllData = () => {
    dispatch(actions.getOneProject(params.id));
    dispatch(
      actions.getAllLogBook({
        page,
        size,
        project: params.id,
        startDate,
        endDate,
      })
    )
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getAllData();

    return () => {};
  }, [page, size, startDate, endDate]);

  const handleDelete = (id) => {
    try {
      const confirm = window.confirm("คุณต้องการลบ Logbook นี้ใช่หรือไม่?");
      if (confirm) {
        dispatch(actions.deleteOneLogBook(id)).then(() => {
          getAllData();
        });
      }
    } catch (error) {
      alert(`ลบ Logbook ไม่สำเร็จ ${error.message}`);
    }
  };

  const rightButton = (
    <div>
      <Link to={`/project/logbook/create/${project?._id}`}>
        <Button>เพิ่ม</Button>
      </Link>
    </div>
  );

  if (!isReady) {
    return (
      <div className='w-full p-12'>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div>
      <MainLayout
        title={`Logbook ของ ${project?.name} `}
        currentPage='Store'
        rightContainer={rightButton}
        hirachyList={["หน้าหลัก", "โปรเจกต์"]}
        useBackButton
      >
        <div className='my-4 flex justify-between gap-1'>
          <div>
            <Typography
              component='label'
              startDecorator={
                <Switch
                  sx={{ ml: 1 }}
                  checked={enableFilter}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setStartDate("");
                      setEndDate("");
                    }
                    setEnableFilter(e.target.checked);
                  }}
                />
              }
            >
              เปิดการกรอง
            </Typography>
          </div>
          <div>
            <RangePicker
              onChange={(value, dateString) => {
                setStartDate(dateString[0]);
                setEndDate(dateString[1]);
              }}
              disabled={!enableFilter}
            />
          </div>
        </div>

        {_.map(logbook?.rows, (each, index) => (
          <Card key={index} className='my-1'>
            <div className='flex flex-wrap items-center'>
              <div className='w-1/5'>
                <Card variant='soft' color='primary'>
                  <div className='text-center'>
                    {dayjs(each?.date).format("D MMM")}
                    <div className='hidden md:block'>
                      {dayjs(each?.date).format("YYYY")}
                    </div>
                  </div>
                </Card>
              </div>
              <div className='w-4/5 px-2 md:px-4 font-sans'>
                <div className='flex justify-between'>
                  <div className='text-sm font-display flex items-center'>
                    <Avatar size='sm'>
                      {_.first(each?.user?.name || "Unknown")}
                    </Avatar>
                    {each?.user?.name || "Unknown User"}
                  </div>
                  <div className='flex gap-1'>
                    <Link to={`/project/logbook/edit/${each?._id}`}>
                      <Button size='sm' color='warning'>
                        <FontAwesomeIcon icon={faPencil} />
                      </Button>
                    </Link>
                    <Button
                      size='sm'
                      color='danger'
                      onClick={() => handleDelete(each?._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
                <MarkdownRender>{each?.description}</MarkdownRender>
              </div>
            </div>
          </Card>
        ))}
        <div className='flex justify-end my-2'>
          <ButtonGroup variant='outlined' size='sm'>
            <Button
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button disabled>
              หน้า {page} จาก {logbook?.totalPage}{" "}
            </Button>
            <Button
              disabled={!(logbook?.totalPage > page)}
              onClick={() => setPage(page + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </ButtonGroup>
        </div>
      </MainLayout>
    </div>
  );
}
