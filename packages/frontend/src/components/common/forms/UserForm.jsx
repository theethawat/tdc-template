import { Input, PasswordInput, TagsInput } from "@mantine/core";
import _ from "lodash";
import { Controller } from "react-hook-form";

const UserForm = ({
  control,
  defaultValue = {},
  showPasswordInput = false,
  watch,
  departments,
}) => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-full my-1 px-1'>
        <Input.Wrapper label='ชื่อ-นามสกุล' required>
          <Controller
            control={control}
            name='name'
            defaultValue={defaultValue?.name}
            render={({ field }) => (
              <Input placeholder='สมชาย รักสามัคคี' {...field} />
            )}
          />
        </Input.Wrapper>
      </div>{" "}
      <div className='w-full my-1 px-1'>
        <Input.Wrapper label='แผนก'>
          <Controller
            control={control}
            name='departments'
            defaultValue={defaultValue?.departments}
            render={({ field }) => (
              <TagsInput
                {...field}
                data={departments || []}
                defaultValue={field.value}
                placeholder='พิมพ์ชื่อแผนกที่ต้องการ'
              />
            )}
          />
        </Input.Wrapper>
      </div>{" "}
      {showPasswordInput && (
        <div className='w-full flex flex-wrap'>
          <div className='w-full my-1 px-1'>
            <Input.Wrapper
              label='Username'
              description='ชื่อที่จะใช้สำหรับ Login ควรจะเป็นภาษาอังกฤษ ตัวพิมพ์เล็ก'
              required
            >
              <Controller
                control={control}
                name='username'
                defaultValue={defaultValue?.username}
                render={({ field }) => (
                  <Input placeholder='somchai' {...field} />
                )}
              />
            </Input.Wrapper>
          </div>
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
      )}
    </div>
  );
};

export default UserForm;
