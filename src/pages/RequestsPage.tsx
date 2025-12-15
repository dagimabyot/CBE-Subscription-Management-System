// app/requests/page.tsx
"use client";

import {
  Users as UsersIcon,
  UserPlus,
  UserCheck,
  Clock,
  XCircle,
  MoreVertical,
  CheckCircle2,
  Search,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/statsCard";
import AddRequestForm from "../components/AddRequestForm";
import { statusBadge } from "@/components/statusBadge";
import { useAssignees } from "@/hooks/useAssignees";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRequests, useUpdateRequest } from "@/hooks/useRequests";
import { Request } from "@/features/requests/requestsApi";
import { Input } from "@/components/ui/input";

function highlightText(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-gray-200 rounded px-0.5 font-medium">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type Status = Request["status"] | "amended_approved";
type Assignee = { id: string; name: string };

export function AmendDialog({
  onAmend,
  requestId,
  open,
  onOpenChange,
}: {
  requestId: string;
  onAmend: (id: string, note: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Amended Approval</DialogTitle>
          <DialogDescription>
            Provide details about what was amended during approval.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter amendment details..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-2"
        />
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (note.trim() !== "") {
                onAmend(requestId, note.trim());
                setNote("");
              }
            }}
            disabled={!note.trim()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dialog for handling request rejections
 */
export function RejectDialog({
  onReject,
  requestId,
  open,
  onOpenChange,
}: {
  requestId: string;
  onReject: (id: string, reason: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this request.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-2"
        />
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (reason.trim() !== "") {
                onReject(requestId, reason);
                setReason("");
              }
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// ASSIGNEE SELECTOR COMPONENT
// =============================================================================

/**
 * Component for selecting assignees for requests
 */
export function AssigneeSelector({
  assignees,
  requestId,
  onAssign,
  currentAssignee,
}: {
  assignees: Assignee[];
  requestId: string;
  onAssign: (id: string, assignee: string) => void;
  currentAssignee?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between truncate"
          title={currentAssignee}
        >
          {currentAssignee || "Select assignee..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit max-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search assignee..." />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No assignee found.</CommandEmpty>
            <CommandGroup>
              {assignees.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => {
                    onAssign(requestId, user.name);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{user.name}</span>
                  {currentAssignee === user.name && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// =============================================================================
// MAIN REQUESTS PAGE COMPONENT
// =============================================================================

/**
 * Main requests page component displaying requests and management interface
 */
export default function RequestsPage() {
  // Data fetching hooks
  const {
    data: requestsData,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useRequests();
  const updateRequest = useUpdateRequest();
  const {
    data: assignees,
    isLoading: assigneesLoading,
    isError: assigneesError,
  } = useAssignees();

  // State management
  const requests: Request[] = requestsData || [];
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Filter requests based on search query
  const filteredRequests = requests.filter(
    (r) =>
      r.requestedBy.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      r.service.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (r.purpose &&
        r.purpose.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  // Request statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const approvedRequests = requests.filter(
    (r) => r.status === "approved"
  ).length;
  const rejectedRequests = requests.filter(
    (r) => r.status === "rejected"
  ).length;

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================

  /**
   * Handles status change for requests
   */
  const handleStatusChange = (
    id: string,
    status: Status,
    rejectionReason?: string,
    amendmentNote?: string
  ) => {
    updateRequest.mutate({
      id,
      payload: {
        status,
        // Only save rejectionReason if status is "rejected"
        ...(status === "rejected" && rejectionReason
          ? { rejectionReason }
          : {}),
        ...(status !== "rejected" ? { rejectionReason: "" } : {}),

        // Only save amendmentNote if status is "amended_approved"
        ...(status === "amended_approved" && amendmentNote
          ? { amendmentNote }
          : {}),
        ...(status !== "amended_approved" ? { amendmentNote: "" } : {}),
      },
    });
  };

  /**
   * Handles assigning requests to users
   */
  const handleAssign = (id: string, assignee: string) => {
    console.log(`Assign request ${id} to ${assignee}`);
    updateRequest.mutate({ id, payload: { assignedTo: assignee } });
  };

  // ===========================================================================
  // LOADING AND ERROR STATES
  // ===========================================================================

  if (requestsLoading || assigneesLoading) {
    return <p className="text-gray-500 text-center">Loading data...</p>;
  }

  if (requestsError || assigneesError) {
    return (
      <p className="text-red-500 text-center">
        Failed to load data. Please try again.
      </p>
    );
  }

  // ===========================================================================
  // RENDER COMPONENT
  // ===========================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UsersIcon size={24} />
          <h1 className="text-2xl font-bold">Requests Page</h1>
        </div>
        <AddRequestDialog />
      </div>

      {/* Stats Overview */}
      <StatsOverview
        total={totalRequests}
        approved={approvedRequests}
        pending={pendingRequests}
        rejected={rejectedRequests}
      />

      {/* Search and Assignee Info */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-1/3 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requests..."
            className="pl-9"
          />
        </div>

        {assignees && assignees.length > 0 && (
          <div className="text-sm text-gray-500">
            {assignees.length} assignee{assignees.length !== 1 ? "s" : ""}{" "}
            available
          </div>
        )}
      </div>

      {/* Requests Table */}
      <RequestsTable
        requests={filteredRequests}
        onStatusChange={handleStatusChange}
        onAssign={handleAssign}
        assignees={assignees || []}
        searchQuery={debouncedSearch}
      />
    </div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Dialog for adding new requests
 */
function AddRequestDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Request
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="sm:max-w-[625px] gap-0 p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Request</DialogTitle>
            <DialogDescription>
              Fill in the form below to submit your service subscription
              request.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4">
            <AddRequestForm />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

/**
 * Displays statistics overview cards
 */
function StatsOverview({
  total,
  approved,
  pending,
  rejected,
}: {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <StatsCard
        title="Total Requests"
        value={total}
        icon={UsersIcon}
        variant="blue"
      />
      <StatsCard
        title="Approved"
        value={approved}
        icon={UserCheck}
        variant="green"
      />
      <StatsCard
        title="Pending"
        value={pending}
        icon={Clock}
        variant="orange"
      />
      <StatsCard
        title="Rejected"
        value={rejected}
        icon={XCircle}
        variant="red"
      />
    </div>
  );
}

/**
 * Table component displaying all requests
 */
function RequestsTable({
  requests,
  onStatusChange,
  onAssign,
  assignees,
  searchQuery,
}: {
  requests: Request[];
  onStatusChange: (
    id: string,
    status: Status,
    rejectionReason?: string
  ) => void;
  onAssign: (id: string, assignee: string) => void;
  assignees: { id: string; name: string }[];
  searchQuery: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="border-b border-gray-200">
            <TableHead className="py-3.5 px-4 text-left">
              Requested By
            </TableHead>
            <TableHead className="py-3.5 px-4 text-left">Service</TableHead>
            <TableHead className="py-3.5 px-4 text-left">Purpose</TableHead>
            <TableHead className="py-3.5 px-4 text-left">Status</TableHead>
            <TableHead className="py-3.5 px-4 text-left">Created At</TableHead>
            <TableHead className="py-3.5 px-4 text-left">Assigned To</TableHead>
            <TableHead className="py-3.5 px-4 w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                <div className="flex flex-col items-center">
                  <Search size={40} className="text-gray-300 mb-2" />
                  <p className="text-lg font-medium">No requests found</p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
                onStatusChange={onStatusChange}
                onAssign={onAssign}
                assignees={assignees}
                searchQuery={searchQuery}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Individual row in the requests table
 */
function RequestRow({
  request,
  onStatusChange,
  onAssign,
  assignees,
  searchQuery,
}: {
  request: Request;
  onStatusChange: (
    id: string,
    status: Status,
    rejectionReason?: string
  ) => void;
  onAssign: (id: string, assignee: string) => void;
  assignees: { id: string; name: string }[];
  searchQuery: string;
}) {
  return (
    <TableRow className="border-b border-gray-100 hover:bg-gray-50/30 transition-colors">
      <TableCell className="py-3 px-4 font-medium text-gray-900">
        {highlightText(request.requestedBy, searchQuery)}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {highlightText(request.service, searchQuery)}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {highlightText(request.purpose || "No purpose specified", searchQuery)}
      </TableCell>
      <TableCell className="py-3 px-4">
        {(request.status === "rejected" && request.rejectionReason) ||
        (request.status === "amended_approved" && request.amendmentNote) ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={statusBadge({ status: request.status })}>
                  {request.status}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <span className="font-semibold">
                  {request.status === "rejected" ? "Reason: " : "Amendment: "}
                </span>
                {request.status === "rejected"
                  ? request.rejectionReason
                  : request.amendmentNote}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className={statusBadge({ status: request.status })}>
            {request.status.replace("_", " ")}
          </span>
        )}
      </TableCell>

      <TableCell className="py-3 px-4 text-gray-700">
        {new Date(request.requestedDate).toLocaleDateString()}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {request.assignedTo || "—"}
      </TableCell>
      <TableCell className="py-3 px-4 text-right">
        <StatusActions
          request={request}
          requestId={request.id}
          onStatusChange={onStatusChange}
          onAssign={onAssign}
          assignees={assignees}
        />
      </TableCell>
    </TableRow>
  );
}

/**
 * Dropdown menu with status change actions for a request
 */
function StatusActions({
  request,
  requestId,
  onStatusChange,
  onAssign,
  assignees,
}: {
  request: Request;
  requestId: string;
  onStatusChange: (
    id: string,
    status: Status,
    rejectionReason?: string,
    note?: string
  ) => void;
  onAssign: (id: string, assignee: string) => void;
  assignees: { id: string; name: string }[];
}) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isAmendDialogOpen, setIsAmendDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-lg shadow-md">
          {/* Approve Submenu */}
          <DropdownMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-between w-full text-left">
                  <span>Approve</span>
                  <ChevronsUpDown className="ml-2 h-3 w-3" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 rounded-lg shadow-md">
                <DropdownMenuItem asChild>
                  <button
                    type="button"
                    onClick={() => onStatusChange(requestId, "approved")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <CheckCircle2 className="h-4 w-4 text-gray-700" /> Direct
                    Approve
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button
                    type="button"
                    onClick={() => setIsAmendDialogOpen(true)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <CheckCircle2 className="h-4 w-4 text-gray-700" /> Amended
                    Approve
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenuItem>

          {/* Pending */}
          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={() => onStatusChange(requestId, "pending")}
              className="flex items-center gap-2 w-full text-left"
            >
              <Clock className="h-4 w-4 text-gray-700" /> Set Pending
            </button>
          </DropdownMenuItem>

          {/* Reject */}
          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={() => setIsRejectDialogOpen(true)}
              className="flex items-center gap-2 w-full text-left"
            >
              <XCircle className="h-4 w-4 text-gray-700" /> Reject
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Assignee */}
          <div className="p-1">
            <AssigneeSelector
              assignees={assignees}
              requestId={requestId}
              onAssign={onAssign}
              currentAssignee={request.assignedTo}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reject dialog */}
      <RejectDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        requestId={requestId}
        onReject={(id, reason) => {
          onStatusChange(id, "rejected", reason);
          setIsRejectDialogOpen(false);
        }}
      />

      {/* Amend dialog */}
      <AmendDialog
        open={isAmendDialogOpen}
        onOpenChange={setIsAmendDialogOpen}
        requestId={requestId}
        onAmend={(id, note) => {
          setIsAmendDialogOpen(false);
          onStatusChange(id, "amended_approved", undefined, note);
        }}
      />
    </>
  );
}
