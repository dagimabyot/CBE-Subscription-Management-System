import { useQuery } from "@tanstack/react-query";

export interface Assignee {
  id: string;
  name: string;
}

export const useAssignees = () => {
  return useQuery<Assignee[]>({
    queryKey: ["assignees"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/assignees"); // your json-server URL
      if (!res.ok) throw new Error("Failed to fetch assignees");
      return res.json();
    },
  });
};
