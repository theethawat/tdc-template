import { IconAdjustments, IconChevronRight } from "@tabler/icons-react";

const menuList = [
  {
    label: "Management",
    icon: IconAdjustments,
    initiallyOpened: false,
    links: [
      {
        label: "จัดการผู้เข้าใช้งาน User Account",
        link: "/management/user",
      },
      /** Script Add Link Management */
    ],
  },
  /** Script Add Module Link */
];
export default menuList;
