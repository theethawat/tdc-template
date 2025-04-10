import { Input, PasswordInput } from "@mantine/core";
import { Controller } from "react-hook-form";

const PasswordForm = ({ control, defaultValue = {}, watch }) => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-1/2 my-1 px-1'>
        <Input.Wrapper
          label='Password'
          description='รหัสผ่านที่จะใช้เข้า ควรจะเป็นภาษาอังกฤษ หรือตัวเลข'
          required
        >
          <Controller
            control={control}
            name='password'
            defaultValue={defaultValue?.password}
            render={({ field }) => <PasswordInput {...field} required />}
          />
        </Input.Wrapper>
      </div>

      <div className='w-full lg:w-1/2 my-1 px-1'>
        <Input.Wrapper
          label='Password Confirmation'
          description='ยีนยันรหัสผ่าน'
          required
        >
          <Controller
            control={control}
            name='password_confirm'
            defaultValue={defaultValue?.password_confirm}
            render={({ field }) => (
              <PasswordInput
                {...field}
                required
                error={
                  watch("password_confirm") !== watch("password") &&
                  "รหัสผ่านไม่ตรงกัน"
                }
              />
            )}
          />
        </Input.Wrapper>
      </div>
    </div>
  );
};

export default PasswordForm;
