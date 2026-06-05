import { useContext } from "react";
import RootineContext from "../provider/RootineProvider.jsx";

export function useRootine () {
    return useContext(RootineContext)
}