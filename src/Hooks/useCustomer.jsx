import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = () => {
    const axiosSecure = useAxiosSecure();

    const {data: customers = [], isPending: loading, refetch} = useQuery({
        queryKey: ["customers"],
        queryFn: async() => {
            const res = await axiosSecure.get("/customers");
            return res.data;
        }
    })
    return [customers, loading, refetch]
}
export default useCustomer;