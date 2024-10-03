import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = (page, limit) => {
    const axiosSecure = useAxiosSecure();

    const { data, isPending: loading, refetch } = useQuery({
        queryKey: ["customers", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get("/customers", {
                params: { page, limit },
            });
            return res.data;
        },
        // keeps previous data while fetching new data
        keepPreviousData: true, 
    });

    return [data, loading, refetch];
}

export default useCustomer;
