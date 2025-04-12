import { IconAdjustments, IconBuildingWarehouse } from "@tabler/icons-react";

const location = window.location;
const menuList = [
  {
    label: "คลัง / Inventory",
    icon: IconBuildingWarehouse,
    initiallyOpened: location.pathname.includes("/inventory"),
    links: [
      {
        label: "จัดการวัตถุดิบ และ สินค้า",
        link: "/inventory/goods",
      },
      /** Script Add Link Inventory */
    ],
  },
  /** Script Add Module Link */
  {
    label: "จัดการ / Management",
    icon: IconAdjustments,
    initiallyOpened: location.pathname.includes("/management"),
    links: [
      {
        label: "จัดการผู้เข้าใช้งาน",
        link: "/management/user",
      },
      /** Script Add Link Management */
    ],
  },
];
export default menuList;
