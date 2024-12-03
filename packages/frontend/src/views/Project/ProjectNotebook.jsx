/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, LinearProgress, Input } from "@mui/joy";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import dayjs from "dayjs";
import { Table } from "antd";

import { MainLayout } from "../../components/layouts";
import * as actions from "../../redux/actions";

export default function ProjectNotebook() {
  const [isReady, setIsReady] = useState(false);
  const notebook = useSelector((state) => state.notebook);
  const project = useSelector((state) => state.project);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const getAllData = () => {
    dispatch(actions.getAllNotebook({ page, size, name, project: params.id }))
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
    dispatch(actions.getOneProject(params.id));

    return () => {};
  }, [params]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setName(searchTerm);
      setPage(1);
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const rightButton = (
    <div className='px-1'>
      <Link to={`/project/notebook/create/${params.id}`}>
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
        title={`Notebook ของโปรเจกต์`}
        currentPage='Store'
        rightContainer={rightButton}
        hirachyList={["หน้าแรก", "โปรเจกต์", project?.name]}
        useBackButton
      >
        <div className='my-4 lg:w-1/2'>
          <Input
            placeholder='ค้นหา'
            startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='my-2'>
          <Table
            onChange={(pagination) => {
              const newPage = pagination?.current;
              const pageSize = pagination?.pageSize;

              setPage(newPage);
              setSize(pageSize);
            }}
            pagination={{
              current: page,
              pageSize: size,
              total: notebook?.total,
            }}
            scroll={{
              x: "true",
            }}
            columns={[
              {
                title: "ลำดับที่",
                index: true,
                dataIndex: "index",
                render: (text, record, index) => (page - 1) * size + index + 1,
              },
              {
                title: "หัวข้อ",
                dataIndex: "title",
                key: "title",
                render: (text, record) => (
                  <Link to={`/project/notebook/detail/${record._id}`}>
                    {text}
                  </Link>
                ),
              },
              {
                title: "รายละเอียด",
                dataIndex: "description",
                key: "description",
                render: (text) => <div>{_.truncate(text, { length: 60 })}</div>,
              },
              {
                title: "วันที่",
                dataIndex: "date",
                key: "date",
                render: (text) => dayjs(text).format("D MMM YYYY"),
              },

              {
                title: "ดำเนินการ",
                dataIndex: "action",
                key: "action",
                render: (text, row) => (
                  <div className='flex gap-1'>
                    <Link to={`/project/notebook/detail/${row._id}`}>
                      <Button>ดู</Button>
                    </Link>
                    <Link to={`/project/notebook/edit/${row._id}`}>
                      <Button color='warning'>แก้ไข</Button>
                    </Link>
                  </div>
                ),
              },
            ]}
            dataSource={notebook?.rows}
          />
        </div>
      </MainLayout>
    </div>
  );
}
