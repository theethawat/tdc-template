import { IconAdjustments, IconChevronRight } from "@tabler/icons-react";

const location = window.location;
const menuList = [
  {
    label: "Management",
    icon: IconAdjustments,
    initiallyOpened: location.pathname.includes("/management"),
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
