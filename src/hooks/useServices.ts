import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi, Service } from "@/features/services/servicesApi";

export const useServices = () => {
  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: servicesApi.getAll,
  });
};

export const useService = (id: string) => {
  return useQuery<Service, Error>({
    queryKey: ["services", id],
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: servicesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Service> }) =>
      servicesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: servicesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
