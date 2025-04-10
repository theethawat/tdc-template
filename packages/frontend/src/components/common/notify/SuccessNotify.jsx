import { Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const SuccessNotify = ({
  title = "สำเร็จ",
  message = "บันทึกข้อมูลถูกต้อง",
}) => {
  const checkIcon = <IconCheck size={20} />;

  return (
    <div>
      <Notification
        icon={checkIcon}
        color='teal'
        title={title}
        mt='md'
        withCloseButton={false}
      >
        {message}
      </Notification>
    </div>
  );
};

export default SuccessNotify;
