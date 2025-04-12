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

export default function ManagementGoodsType() {
  const dispatch = useDispatch();
  const notify = useNotify();

  const goodsType = useSelector((state) => state.goodsType);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [name,setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryData = async()=>{
    try {
        dispatch(actions.getAllGoodsType({ page, size,name }));
        
    } catch (error) {
        notify.error({ title: "ดึงข้อมูลไม่สำเร็จ", message: error.message });
    }
  }

  useEffect(() => {
    queryData()

    return () => {};
  }, [page, size,name]);

  useEffect(() => {
    setTotal(goodsType?.total);

    return () => {};
  }, [goodsType]);

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
      children: <div>คุณต้องการลบประเภทวัตถุดิบและสินค้าใช่หรือไม่</div>,
      labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
      onConfirm: () => {
        dispatch(actions.deleteOneGoodsType(id))
          .then(() => {
            dispatch(actions.getAllGoodsType({ page, size }));
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
        title='จัดการประเภทวัตถุดิบและสินค้า'
        rightContainer={
          <Link to='/inventory/goods-type/create'>
            <Button leftSection={<IconSquarePlus size={18} />}>
              เพิ่มประเภทวัตถุดิบและสินค้า
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
              {!goodsType?.isReady && <Skeleton height={8} mt={6} radius='xl' />}
              {  goodsType?.isReady &&
                _.map(goodsType?.rows, (each, index) => (
                  <Table.Tr key={index}>
                    <Table.Td> {(page - 1) * size + index + 1}</Table.Td>
                    <Table.Td>{each?.name}</Table.Td>
                    <Table.Td>
                      <div className='flex gap-2'>
                        <Link to={`/inventory/goods-type/detail/${each?._id}`}>
                          <Button
                            variant='filled'
                            color='blue'
                            leftSection={<IconFileDescription size={18} />}
                            size="xs"
                          >
                            รายละเอียด
                          </Button>
                        </Link>
                        <Link to={`/inventory/goods-type/edit/${each?._id}`}>
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
