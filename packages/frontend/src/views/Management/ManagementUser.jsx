import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../../components/layouts";
import { Button } from "@mui/joy";
import * as actions from "../../redux/actions";

export default function ManagementUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    dispatch(actions.getAllUser({ page, size }));

    return () => {};
  }, [page, size]);

  return (
    <div>
      <MainLayout title='จัดการผู้ใช้งาน' currentPage='User'>
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
            total: user?.total,
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
              title: "ชื่อพนักงาน",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
            },
            {
              title: "บทบาทการเข้าถึง",
              dataIndex: "role",
              key: "role",
            },
            {
              title: "ดำเนินการ",
              dataIndex: "action",
              key: "action",
              render: (text, row) => (
                <div className='flex gap-1'>
                  <Link to={`/management/user/edit/${row._id}`}>
                    <Button color='warning'>แก้ไข</Button>
                  </Link>
                  <Button color='danger'>ลบ</Button>
                </div>
              ),
            },
          ]}
          dataSource={user?.rows}
        />
      </MainLayout>
    </div>
  );
}
