// src/types/request.ts
export type RequestStatus = "pending" | "approved" | "rejected";
export type RequestPriority = "High" | "Medium" | "Low";

export interface Request {
  id: string;
  requestedBy: string;
  userId: string;
  service: string;
  serviceId: string;
  department: string;
  purpose: string;
  status: RequestStatus;
  requestedDate: string;
  priority: RequestPriority;
}

export interface CreateRequestDto
  extends Omit<Request, "id" | "requestedDate" | "status"> {
  status?: RequestStatus; // Optional for creation
}

export interface UpdateRequestDto extends Partial<Omit<Request, "id">> {}

export interface RequestsFilter {
  status?: RequestStatus;
  userId?: string;
  serviceId?: string;
  department?: string;
  priority?: RequestPriority;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Request;
  order?: "asc" | "desc";
}
