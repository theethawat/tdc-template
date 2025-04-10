import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../../../components/layouts";
import { Pagination } from "../../../components";
import * as actions from "../../../redux/actions";
import { Table, Button, Skeleton } from "@mantine/core";
import {
  IconEdit,
  IconFileDescription,
  IconTrash,
  IconKey,
  IconSquarePlus,
} from "@tabler/icons-react";
import _ from "lodash";

export default function ManagementUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(actions.getAllUser({ page, size }));

    return () => {};
  }, [page, size]);

  useEffect(() => {
    setTotal(user?.total);

    return () => {};
  }, [user]);

  return (
    <div>
      <MainLayout
        title='จัดการผู้ใช้งาน'
        currentPage='User'
        rightContainer={
          <Link to='/management/user/create'>
            <Button leftSection={<IconSquarePlus size={18} />}>
              เพิ่มผู้ใช้งาน
            </Button>
          </Link>
        }
      >
        <Table.ScrollContainer minWidth={800}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>รายการที่</Table.Th>
                <Table.Th>ชื่อ-สกุล</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>ดำเนินการ</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!user?.isReady && <Skeleton height={8} mt={6} radius='xl' />}
              {user?.isReady &&
                _.map(user?.rows, (each, index) => (
                  <Table.Tr key={index}>
                    <Table.Td> {(page - 1) * size + index + 1}</Table.Td>
                    <Table.Td>{each?.name}</Table.Td>
                    <Table.Td>{each?.username}</Table.Td>
                    <Table.Td>
                      <div className='flex gap-2'>
                        <Button
                          variant='filled'
                          leftSection={<IconFileDescription size={18} />}
                        >
                          รายละเอียด
                        </Button>
                        <Link to={`/management/user/edit/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='yellow'
                            leftSection={<IconEdit size={18} />}
                          >
                            แก้ไข
                          </Button>
                        </Link>
                        <Button
                          variant='filled'
                          color='black'
                          leftSection={<IconKey size={18} />}
                        >
                          แก้รหัสผ่าน
                        </Button>
                        <Button
                          variant='filled'
                          color='red'
                          leftSection={<IconTrash size={18} />}
                        >
                          ลบ
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Pagination
          page={page}
          setPage={setPage}
          setSize={setSize}
          size={size}
          total={total}
        />
      </MainLayout>
    </div>
  );
}
