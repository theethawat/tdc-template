import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MainLayout, useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { Paper } from "@mantine/core";
import { useParams } from "react-router";

export default function Detail{{modelName}}() {
  const dispatch = useDispatch();
  const {{modelCamelCase}} = useSelector((state) => state.{{modelCamelCase}});
  const notify = useNotify();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.getOne{{modelName}}(params.id))
      .then(() => {})
      .catch((err) => {
        notify.error({
          title: "ไม่สามารถโหลดข้อมูลได้",
          message: err.message,
        });
      });

    return () => {};
  }, [params]);

  return (
    <div>
      <MainLayout
        title='รายละเอียด{{modelThaiName}}'
        useBackButton
        isReady={ {{modelCamelCase}}.isReady }
      >
        <Paper shadow='sm' p='xl'>
          <div className='flex flex-wrap'>
            <div className='w-full'>
              <b>ชื่อ{{modelThaiName}} : </b>
              {user?.name}
            </div>
          </div>
        </Paper>
      </MainLayout>
    </div>
  );
}
