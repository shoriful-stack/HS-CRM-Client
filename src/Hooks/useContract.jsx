import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useContract = (page, limit, filters) => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: loading, refetch } = useQuery({
        queryKey: ["contracts", page, limit, filters],
        queryFn: async () => {
            // Build query parameters based on filters
            const params = {
                page,
                limit,
            };

            if (filters.projectType) {
                params.projectType = filters.projectType;
            }

            if (filters.contractStatus) {
                params.contractStatus = filters.contractStatus;
            }

            const res = await axiosSecure.get("/contracts", { params });
            return res.data;
        },
        keepPreviousData: true, // Keeps previous data while fetching new data
    });

    return [data, loading, refetch];
};

export default useContract;
