import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProject = (page, limit) => {
    const axiosSecure = useAxiosSecure();

    const { data, isPending: loading, refetch } = useQuery({
        queryKey: ["projects", page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get("/projects", {
                params: { page, limit },
            });
            return res.data;
        },
        keepPreviousData: true, // Keeps previous data while fetching new data
    });

    return [data, loading, refetch];
}

export default useProject;