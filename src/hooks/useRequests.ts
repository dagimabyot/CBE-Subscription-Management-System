import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { requestsApi, Request } from "@/features/requests/requestsApi";

// -------------------------
// Fetching
// -------------------------
export const useRequests = () => {
  return useQuery<Request[], Error>({
    queryKey: ["requests"],
    queryFn: requestsApi.getAll,
  });
};

export const useRequest = (id: string) => {
  return useQuery<Request, Error>({
    queryKey: ["requests", id],
    queryFn: () => requestsApi.getById(id),
    enabled: !!id,
  });
};

// -------------------------
// Mutations
// -------------------------
export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestsApi.create,
    onSuccess: (newRequest) => {
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old ? [...old, newRequest] : [newRequest]
      );
    },
  });
};

export const useUpdateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Request> }) =>
      requestsApi.update(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old
          ? old.map((req) => (req.id === updated.id ? updated : req))
          : [updated]
      );
    },
  });
};

// -------------------------
// ✅ Optimistic Status Update
// -------------------------
export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "approved" | "rejected";
    }) => requestsApi.updateStatus(id, status),

    // Optimistic update
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["requests"] });

      const previous = queryClient.getQueryData<Request[]>(["requests"]);

      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old ? old.map((req) => (req.id === id ? { ...req, status } : req)) : []
      );

      return { previous };
    },

    // Rollback if error
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["requests"], context.previous);
      }
    },

    // Replace with server response
    onSuccess: (updated) => {
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old
          ? old.map((req) => (req.id === updated.id ? updated : req))
          : [updated]
      );
    },
  });
};

// -------------------------
// Delete Request
// -------------------------
export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestsApi.delete,
    onSuccess: (_res, id) => {
      queryClient.setQueryData<Request[]>(["requests"], (old) =>
        old ? old.filter((req) => req.id !== id) : []
      );
    },
  });
};
