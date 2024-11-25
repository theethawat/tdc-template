import { Controller } from "react-hook-form";
import { FormControl, FormLabel, Input, Textarea } from "@mui/joy";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ProjectForm = ({ control, defaultValue }) => {
  return (
    <div className='flex flex-wrap mx-1'>
      <div className='my-2 w-full'>
        <Controller
          control={control}
          name={`name`}
          defaultValue={defaultValue?.name}
          render={({ field }) => (
            <FormControl>
              <FormLabel>ชื่อโปรเจกต์</FormLabel>
              <Input {...field} placeholder='ชื่อโปรเจกต์' required />
            </FormControl>
          )}
        />
      </div>
      <div className='my-2 w-full'>
        <Controller
          control={control}
          name={`description`}
          defaultValue={defaultValue?.description}
          render={({ field }) => (
            <FormControl>
              <FormLabel>รายละเอียด</FormLabel>
              <Textarea {...field} placeholder='รายละเอียด' minRows={3} />
            </FormControl>
          )}
        />
      </div>
      <div className='my-2 w-full md:w-1/2'>
        <Controller
          control={control}
          name={`start_date`}
          defaultValue={
            defaultValue?.start_date ? dayjs(defaultValue.start_date) : null
          }
          render={({ field }) => (
            <FormControl>
              <FormLabel>วันที่เริ่ม</FormLabel>
              <DatePicker {...field} />
            </FormControl>
          )}
        />
      </div>
      <div className='my-2 w-full md:w-1/2 md:pl-2'>
        <Controller
          control={control}
          name={`expected_date`}
          defaultValue={
            defaultValue?.expected_date
              ? dayjs(defaultValue.expected_date)
              : null
          }
          render={({ field }) => (
            <FormControl>
              <FormLabel>วันที่สินสุด</FormLabel>
              <DatePicker {...field} />
            </FormControl>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectForm;

ProjectForm.propTypes = {
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
};
