import { useContext } from "react";
import ExpedientsContext from "../context/ExpedientsProvider";

const useExpedients = () => {
    return useContext(ExpedientsContext);    
}

export default useExpedients;