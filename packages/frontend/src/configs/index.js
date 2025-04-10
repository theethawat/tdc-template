import app from "./app";
import api from "./api";
import navigation from "./general/navigation";
import menuList from "./general/menuList";
import specifyMenuList from "./specific";

const allMenuList = [...menuList, ...specifyMenuList];

export { app, api, navigation, allMenuList as menu };
export default { app, api, navigation, menu: allMenuList };
