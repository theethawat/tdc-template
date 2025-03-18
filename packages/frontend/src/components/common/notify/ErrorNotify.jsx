import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const ErrorNotify = ({
  title = "เกิดข้อผิดพลาด",
  message = "มีข้อผิดพลาดเกิดขึ้น",
}) => {
  const xIcon = <IconX size={20} />;

  return (
    <div>
      <Notification
        icon={xIcon}
        color='red'
        title={title}
        mt='md'
        withCloseButton={false}
      >
        {message}
      </Notification>
    </div>
  );
};

export default ErrorNotify;
