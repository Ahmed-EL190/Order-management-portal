import { useContext } from "react";
import { GlobalContext } from "./context";


export const useGlobal = () => {
  return useContext(GlobalContext);
};