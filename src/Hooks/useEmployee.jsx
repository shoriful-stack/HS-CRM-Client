import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

// This hook contain the 1st 10 data of customer collection due to pagination
const useEmployee = (page, limit) => { 
    const axiosSecure = useAxiosSecure();

    const { data, isPending: loading, refetch } = useQuery({
        queryKey: ["employees", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get("/employees", {
                params: { page, limit },
            });
            return res.data;
        },
        // keeps previous data while fetching new data
        keepPreviousData: true, 
    });

    return [data, loading, refetch];
}

export default useEmployee;