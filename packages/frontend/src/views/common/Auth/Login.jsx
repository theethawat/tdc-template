import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "../../../assets/css/AuthenticationImage.module.css";
import { AuthLayout } from "../../../components/layouts";
import { useNotify } from "../../../components";
import * as actions from "../../../redux/actions";
import { information } from "@iarc-programing/tp2025-constants";

export default function Login() {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const notify = useNotify();

  const handleLogin = (data) => {
    dispatch(actions.meLogin(data))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("Err", err);
        notify.error({ title: "ล็อกอินไม่สำเร็จ", message: err?.message });
      });
  };

  return (
    <AuthLayout title=''>
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta='' mt='md' mb={50}>
              <Text size='lg' variant='gradient'>
                Welcome to
              </Text>
              {information.title}
            </Title>

            <Controller
              name='username'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='ชื่อผู้ใช้ / Username'
                  placeholder='myname'
                  size='md'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <PasswordInput
                  label='รหัสผ่าน / Password'
                  placeholder='Your password'
                  mt='md'
                  size='md'
                  {...field}
                />
              )}
            />
            <Button fullWidth mt='xl' size='md' type='submit'>
              เข้าสู่ระบบ
            </Button>

            <Text ta='center' mt='md'>
              ยังไม่มี Account ใช่หรือไม่?{" "}
              <Anchor
                href='#'
                fw={700}
                onClick={(event) => event.preventDefault()}
              >
                ลงทะเบียนขอเข้าใช้
              </Anchor>
              <br />
              การเข้าระบบจะเข้าได้ก็ต่อเมื่อได้รับอนุญาตจากผู้ดูแลระบบ
            </Text>
          </Paper>{" "}
        </form>
      </div>
    </AuthLayout>
  );
}
