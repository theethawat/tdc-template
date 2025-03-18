/**
 * Credit From
 * https://medium.com/@aibolkussain/creating-toast-api-with-react-hooks-94e454379632
 */

import { useContext } from "react";
import NotifyContext from "./NotifyContext";

const useNotify = () => {
  const { success, error } = useContext(NotifyContext);
  return { success, error };
};

export default useNotify;
