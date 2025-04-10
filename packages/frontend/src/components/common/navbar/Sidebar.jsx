{
  /* <Link
to={each?.link}
className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
>
<FontAwesomeIcon icon={each?.icon} />
<span className='ms-3'>{each?.name}</span>
</Link> */
}

import { IconBandage } from "@tabler/icons-react";
import { Code, Group, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "../../../assets/css/NavbarNested.module.css";
import { information } from "@iarc-programing/tp2025-constants";
import { menu } from "../../../configs";
import UserButton from "../buttons/UserButton";

export default function Sidebar({ userData }) {
  const links = menu.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify='space-between'>
          <div className='flex gap-2 font-semibold'>
            <IconBandage /> {information.title}
          </div>
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton selectedUser={userData} />
      </div>
    </nav>
  );
}
