import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../../../components/layouts";
import { Pagination } from "../../../components";
import * as actions from "../../../redux/actions";
import { Table, Button, Skeleton, TextInput } from "@mantine/core";
import {
  IconEdit,
  IconFileDescription,
  IconTrash,
  IconKey,
  IconSquarePlus,
  IconSearch,
} from "@tabler/icons-react";
import _ from "lodash";
import { modals } from "@mantine/modals";

export default function ManagementUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(actions.getAllUser({ page, size, name }));

    return () => {};
  }, [page, size, name]);

  useEffect(() => {
    setTotal(user?.total);

    return () => {};
  }, [user]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setName(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = (id) => {
    modals.openConfirmModal({
      title: "ยืนยันการลบ",
      children: <div>คุณต้องการลบผู้ใช้งานนี้หรือไม่</div>,
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      onConfirm: () => {
        dispatch(actions.deleteOneUser(id))
          .then(() => {
            dispatch(actions.getAllUser({ page, size }));
          })
          .catch((error) => {
            console.error(error);
          });
      },
      onCancel: () => {
        console.log("Cancelled");
      },
    });
  };

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
        <div className='my-6'>
          <TextInput
            mt='md'
            rightSectionPointerEvents='none'
            rightSection={<IconSearch size={16} />}
            placeholder='ค้นหา'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table.ScrollContainer minWidth={800}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>รายการที่</Table.Th>
                <Table.Th>ชื่อ-สกุล</Table.Th>
                <Table.Th>Username</Table.Th>
                <Table.Th>แผนก</Table.Th>
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
                    <Table.Td>
                      {each?.allowLogin ? each?.username : "-"}
                    </Table.Td>
                    <Table.Td>
                      {_.map(each?.departments, (dept) => dept)?.join(", ")}
                    </Table.Td>
                    <Table.Td>
                      <div className='flex gap-2'>
                        <Link to={`/management/user/detail/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='blue'
                            leftSection={<IconFileDescription size={18} />}
                            size='xs'
                          >
                            รายละเอียด
                          </Button>
                        </Link>
                        <Link to={`/management/user/edit/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='yellow'
                            leftSection={<IconEdit size={18} />}
                            size='xs'
                          >
                            แก้ไข
                          </Button>
                        </Link>
                        <Link
                          to={`/management/user/edit-password/${each?._id}`}
                        >
                          <Button
                            variant='filled'
                            color='black'
                            leftSection={<IconKey size={18} />}
                            size='xs'
                          >
                            แก้รหัสผ่าน
                          </Button>
                        </Link>
                        <Button
                          variant='filled'
                          color='red'
                          leftSection={<IconTrash size={18} />}
                          onClick={() => handleDelete(each?._id)}
                          size='xs'
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
