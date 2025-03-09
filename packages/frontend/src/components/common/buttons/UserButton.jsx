import { IconChevronRight } from "@tabler/icons-react";
import { Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../../../assets/css/UserButton.module.css";
import Avvvatars from "avvvatars-react";

export default function UserButton({ selectedUser }) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avvvatars value={selectedUser?.name} style='shape' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            {selectedUser?.name}
          </Text>

          <Text c='dimmed' size='xs'></Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
