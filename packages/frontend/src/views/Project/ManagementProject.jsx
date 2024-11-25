/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, LinearProgress, Input, Typography, Card } from "@mui/joy";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import dayjs from "dayjs";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function ManagementProject() {
  const [isReady, setIsReady] = useState(false);
  const project = useSelector((state) => state.project);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getAllData = () => {
    dispatch(actions.getAllProject({ page, size, name }))
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
  }, [name, page, size]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setName(searchTerm);
      setPage(1);
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const rightButton = (
    <div>
      <Link to='/project/create'>
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
        title='จัดการโปรเจกต์'
        currentPage='Store'
        rightContainer={rightButton}
        hirachyList={["หน้าหลัก"]}
      >
        <div className='my-4 lg:w-1/2'>
          <Input
            placeholder='ค้นหา'
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='my-4 grid md:grid-cols-2 lg:grid-cols-3'>
          {_.map(project?.rows, (each, index) => (
            <Link to={`/project/detail/${each?._id}`}>
              <Card key={index} color='neutral' className='hover:shadow-md'>
                <Typography level='title-lg'>{each?.name}</Typography>
                <p>
                  {_.truncate(each?.description, {
                    length: 100,
                  })}
                </p>
                <p className='text-gray-400 text-sm'>
                  {dayjs(each?.start_date).format("D MMM YYYY")} -{" "}
                  {dayjs(each?.end_date).format("D MMM YYYY")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        {project?.total > size && (
          <div className='flex justify-center'>
            <Button
              onClick={() => {
                setSize(size + 5);
              }}
            >
              เพิ่มอีก 5 รายการ
            </Button>
          </div>
        )}
      </MainLayout>
    </div>
  );
}
