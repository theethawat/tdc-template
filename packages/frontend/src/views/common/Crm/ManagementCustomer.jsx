import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../../../components/layouts";
import { Pagination,useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Table, Button, Skeleton ,TextInput} from "@mantine/core";
import {
  IconEdit,
  IconFileDescription,
  IconTrash,
  IconSquarePlus,IconSearch
} from "@tabler/icons-react";
import _ from "lodash";
import { modals } from "@mantine/modals";

export default function ManagementCustomer() {
  const dispatch = useDispatch();
  const notify = useNotify();

  const customer = useSelector((state) => state.customer);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [name,setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryData = async()=>{
    try {
        dispatch(actions.getAllCustomer({ page, size,name }));
        
    } catch (error) {
        notify.error({ title: "ดึงข้อมูลไม่สำเร็จ", message: error.message });
    }
  }

  useEffect(() => {
    queryData()

    return () => {};
  }, [page, size,name]);

  useEffect(() => {
    setTotal(customer?.total);

    return () => {};
  }, [customer]);

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
      children: <div>คุณต้องการลบคู่ค้าและลูกค้าใช่หรือไม่</div>,
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      onConfirm: () => {
        dispatch(actions.deleteOneCustomer(id))
          .then(() => {
            dispatch(actions.getAllCustomer({ page, size }));
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
        title='จัดการคู่ค้าและลูกค้า'
        rightContainer={
          <Link to='/crm/customer/create'>
            <Button leftSection={<IconSquarePlus size={18} />}>
              เพิ่มคู่ค้าและลูกค้า
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
                <Table.Th>ชื่อ</Table.Th>
                <Table.Th>ดำเนินการ</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!customer?.isReady && <Skeleton height={8} mt={6} radius='xl' />}
              {  customer?.isReady &&
                _.map(customer?.rows, (each, index) => (
                  <Table.Tr key={index}>
                    <Table.Td> {(page - 1) * size + index + 1}</Table.Td>
                    <Table.Td>{each?.name}</Table.Td>
                    <Table.Td>
                      <div className='flex gap-2'>
                        <Link to={`/crm/customer/detail/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='blue'
                            leftSection={<IconFileDescription size={18} />}
                            size="xs"
                          >
                            รายละเอียด
                          </Button>
                        </Link>
                        <Link to={`/crm/customer/edit/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='yellow'
                            leftSection={<IconEdit size={18} />}
                            size="xs"
                          >
                            แก้ไข
                          </Button>
                        </Link>
                        
                        <Button
                          variant='filled'
                          color='red'
                          leftSection={<IconTrash size={18} />}
                          onClick={() => handleDelete(each?._id)}
                          size="xs"
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
