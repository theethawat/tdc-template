import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Typography,
  Switch,
  Textarea,
  Input,
} from "@mui/joy";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogbookForm = ({ control, defaultValue, showTitle, rows = 4 }) => {
  return (
    <div className='flex flex-wrap mx-1'>
      {showTitle && (
        <div className='my-2 w-full'>
          <Controller
            control={control}
            name={`title`}
            defaultValue={defaultValue?.title}
            render={({ field }) => (
              <FormControl>
                <FormLabel>ชื่อเรื่อง</FormLabel>
                <Input {...field} placeholder='ชื่อเรื่อง' />
              </FormControl>
            )}
          />
        </div>
      )}
      <div className='my-2 w-full md:w-1/2'>
        <Controller
          control={control}
          name={`date`}
          defaultValue={defaultValue?.date ? dayjs(defaultValue.date) : null}
          render={({ field }) => (
            <FormControl>
              <FormLabel>วันที่</FormLabel>
              <DatePicker {...field} />
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
              <FormLabel>
                บันทึก <FontAwesomeIcon icon={faMarkdown} />{" "}
              </FormLabel>
              <Textarea {...field} placeholder='บันทึก' minRows={rows} />
            </FormControl>
          )}
        />
      </div>
      <div className='my-2 w-full'>
        {" "}
        <Controller
          control={control}
          name={`private`}
          defaultValue={defaultValue?.private}
          render={({ field }) => (
            <Typography
              component='label'
              startDecorator={
                <Switch
                  sx={{ ml: 1 }}
                  {...field}
                  defaultChecked={field.value}
                />
              }
            >
              ตั้งค่าเป็น Private
            </Typography>
          )}
        />
      </div>
    </div>
  );
};

export default LogbookForm;

LogbookForm.propTypes = {
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
};
