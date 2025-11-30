import { useSelector } from "react-redux";


export function useExtraDetails() {
    return useSelector(state=> state.auth.extraDetails);
}