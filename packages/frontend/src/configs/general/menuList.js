import { IconAdjustments, IconBuildingWarehouse } from "@tabler/icons-react";

const menuList = [
  {
    label: "คลัง / Inventory",
    icon: IconBuildingWarehouse,
    moduleName: "inventory",
    links: [
      {
        label: "จัดการวัตถุดิบ และ สินค้า",
        link: "/inventory/goods",
      },
      {
        label: "จัดการประเภทวัตถุดิบและสินค้า",
        link: "/inventory/goods-type",
      },
      /** Script Add Link Inventory */
    ],
  },
  {
    label: "ลูกค้าสัมพันธ์ / CRM",
    icon: IconBuildingWarehouse,
    moduleName: "crm",
    links: [
      {
        label: "จัดการคู่ค้าและลูกค้า",
        link: "/crm/customer",
      },
      /** Script Add Link Inventory */
    ],
  },
  /** Script Add Module Link */
  {
    label: "จัดการ / Management",
    icon: IconAdjustments,
    moduleName: "management",
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
