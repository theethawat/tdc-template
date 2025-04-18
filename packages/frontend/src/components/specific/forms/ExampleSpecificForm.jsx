import { Input } from "@mantine/core";
import { Controller } from "react-hook-form";

const ExampleSpecificForm = ({ control, defaultValue = {}, watch }) => {
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
    </div>
  );
};

export default ExampleSpecificForm;
