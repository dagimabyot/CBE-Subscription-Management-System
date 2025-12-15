import apiClient from "@/api/apiClient";

export interface Service {
  id: number;
  serviceType: string;
  description?: string;
  specifications?: string[];
}

export const servicesApi = {
  // Fetch all services
  async getAll(): Promise<Service[]> {
    const response = await apiClient.get<Service[]>("/services");
    return response.data;
  },

  // Fetch a single service by ID
  async getById(id: string): Promise<Service> {
    const response = await apiClient.get<Service>(`/services/${id}`);
    return response.data;
  },

  // Create a new service
  async create(payload: Partial<Service>): Promise<Service> {
    const response = await apiClient.post<Service>("/services", payload);
    return response.data;
  },

  // Update an existing service (any fields)
  async update(id: string, payload: Partial<Service>): Promise<Service> {
    const response = await apiClient.patch<Service>(`/services/${id}`, payload);
    return response.data;
  },

  // Delete a service
  async delete(id: string): Promise<null> {
    const response = await apiClient.delete<null>(`/services/${id}`);
    return response.data;
  },
};
