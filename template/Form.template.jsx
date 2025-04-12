import { Input } from "@mantine/core";
import { Controller } from "react-hook-form";

const {{modelName}}Form = ({ control, defaultValue = {}, watch }) => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-full my-1 px-1'>
        <Input.Wrapper label='ชื่อ'>
          <Controller
            control={control}
            name='name'
            defaultValue={defaultValue?.name}
            render={({ field }) => (
              <Input placeholder='สมชาย' {...field} />
            )}
          />
        </Input.Wrapper>
      </div>{" "}
    </div>
  );
};

export default {{modelName}}Form;
