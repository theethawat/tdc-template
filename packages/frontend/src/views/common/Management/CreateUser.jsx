import { useDispatch } from "react-redux";
import { MainLayout, UserForm } from "../../../components";
import * as actions from "../../../redux/actions";
import { useForm } from "react-hook-form";
import { Table, Button, Skeleton } from "@mantine/core";
import {
  IconEdit,
  IconFileDescription,
  IconTrash,
  IconKey,
  IconSquarePlus,
} from "@tabler/icons-react";
import _ from "lodash";

export default function CreateUser() {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm();
  return (
    <div>
      <MainLayout title='เพิ่มผู้ใช้งาน' currentPage='User' useBackButton>
        <UserForm control={control} watch={watch} showPasswordInput />
      </MainLayout>
    </div>
  );
}
