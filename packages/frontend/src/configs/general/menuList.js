import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

const menuList = [
  { label: "Dashboard", icon: IconGauge },

  {
    label: "Settings",
    icon: IconAdjustments,
    initiallyOpened: true,
    links: [
      {
        label: "จัดการผู้เข้าใช้งาน User Account",
        link: "/management/user",
      },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
];
export default menuList;
