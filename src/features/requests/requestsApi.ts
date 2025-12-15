import apiClient from "@/api/apiClient";

export interface Request {
  id: string; // matches the id in your JSON (e.g. "req-3")
  requestedBy: string;
  userId: string;
  service: string;
  serviceId: string;
  department: string;
  purpose: string;
  status: "pending" | "approved" | "rejected" | "amended_approved";
  requestedDate: string; // can be empty string or a date string
  priority: "High" | "Medium" | "Low";
  assignedTo?: string;
  rejectionReason?: string;
  amendmentNote?: string;reason?: string;
}

export const requestsApi = {
  // Fetch all requests
  async getAll(): Promise<Request[]> {
    const response = await apiClient.get<Request[]>("/requests");
    return response.data;
  },

  // Fetch a single request
  async getById(id: string): Promise<Request> {
    const response = await apiClient.get<Request>(`/requests/${id}`);
    return response.data;
  },

  // Create a new request
  async create(payload: Partial<Request>): Promise<Request> {
    const response = await apiClient.post<Request>("/requests", payload);
    return response.data;
  },

  // Update any fields of a request
  async update(id: string, payload: Partial<Request>): Promise<Request> {
    const response = await apiClient.patch<Request>(`/requests/${id}`, payload);
    return response.data;
  },

  // ✅ Update only the status of a request
  async updateStatus(
    id: string,
    status: "pending" | "approved" | "rejected" | "amended_approved"
  ): Promise<Request> {
    const response = await apiClient.patch<Request>(`/requests/${id}`, {
      status,
    });
    return response.data;
  },

  // Delete a request
  async delete(id: string): Promise<null> {
    const response = await apiClient.delete<null>(`/requests/${id}`);
    return response.data;
  },
};
