import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProject = () => {
    const axiosSecure = useAxiosSecure();

    const {data: projects = [], isPending: loading, refetch} = useQuery({
        queryKey: ["projects"],
        queryFn: async() => {
            const res = await axiosSecure.get("/projects");
            return res.data;
        }
    })
    return [projects, loading, refetch]
}
export default useProject;