import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

// This hook contain the 1st 10 data of customer collection due to pagination
const useProject_Master = (page, limit) => { 
    const axiosSecure = useAxiosSecure();

    const { data, isPending: loading, refetch } = useQuery({
        queryKey: ["project_master", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get("/project_master", {
                params: { page, limit },
            });
            return res.data;
        },
        // keeps previous data while fetching new data
        keepPreviousData: true, 
    });

    return [data, loading, refetch];
}

export default useProject_Master;