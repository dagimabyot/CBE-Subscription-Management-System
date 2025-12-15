"use client";

import {
  Layers as ServicesIcon,
  PlusCircle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import StatsCard from "@/components/statsCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
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
} from "@/components/ui/dropdown-menu";

import { useServices, useDeleteService } from "@/hooks/useServices";
import { Service } from "@/features/services/servicesApi";
import { useCreateService } from "@/hooks/useServices";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ServicesPage() {
  const { data, isLoading, isError } = useServices();
  const deleteService = useDeleteService();

  const services: Service[] = (data || []).slice(0, 3);

  const handleDelete = (id: number) => {
    deleteService.mutate(id.toString());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ServicesIcon size={24} />
          <h1 className="text-2xl font-bold">Services Page</h1>
        </div>
        <AddServiceDialog />
      </div>

      {isLoading && (
        <p className="text-gray-500 text-center">Loading services...</p>
      )}
      {isError && (
        <p className="text-red-500 text-center">
          Failed to load services. Please try again.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <StatsOverview total={services.length} />

          <ServicesTable services={services} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

function AddServiceDialog() {
  const [open, setOpen] = useState(false);
  const createService = useCreateService();

  const [serviceName, setServiceName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [specificationText, setSpecificationText] = useState("");
  const [feesCharges, setFeesCharges] = useState("");
  const [processingDuration, setProcessingDuration] = useState<string>("");
  const [processingUnit, setProcessingUnit] = useState<string>("Minutes");

  const resetForm = () => {
    setServiceName("");
    setBranchLocation("");
    setCategory("");
    setDescription("");
    setSpecificationText("");
    setFeesCharges("");
    setProcessingDuration("");
    setProcessingUnit("Minutes");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const specifications: string[] = [];

    if (specificationText) {
      const byNewline = specificationText
        .split("\n")
        .map((s) => s.split(","))
        .flat()
        .map((s) => s.trim())
        .filter(Boolean);
      specifications.push(...byNewline);
    }

    if (branchLocation)
      specifications.push(`Branch/Location: ${branchLocation}`);
    if (category) specifications.push(`Category: ${category}`);
    if (feesCharges) specifications.push(`Fees/Charges: ${feesCharges}`);
    if (processingDuration)
      specifications.push(
        `Processing Time: ${processingDuration} ${processingUnit}`
      );

    createService.mutate(
      {
        serviceType: serviceName,
        description,
        specifications,
      },
      {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Service
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="sm:max-w-[800px] gap-0 p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Request</DialogTitle>
            <DialogDescription>
              Fill in the form below to register a new service.
            </DialogDescription>
          </DialogHeader>

          <form
            id="service-form"
            className="px-6 py-4 space-y-4"
            onSubmit={handleSubmit}
          >
            {/* Row 1: Service Name / Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  placeholder="Enter service name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchLocation">Branch/Location</Label>
                <Input
                  id="branchLocation"
                  placeholder="Enter branch or location"
                  value={branchLocation}
                  onChange={(e) => setBranchLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Connectivity">Connectivity</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Data Center">Data Center</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="processingDuration">Processing Time</Label>
                <Input
                  id="processingDuration"
                  placeholder="Duration"
                  type="number"
                  min="0"
                  value={processingDuration}
                  onChange={(e) => setProcessingDuration(e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label>Unit</Label>
                <Select
                  value={processingUnit}
                  onValueChange={setProcessingUnit}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minutes">Minutes</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the service offering"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Specifications</Label>
              <Textarea
                id="specifications"
                placeholder="Enter specifications, one per line or comma-separated"
                value={specificationText}
                onChange={(e) => setSpecificationText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fees">Fees/Charges</Label>
              <Input
                id="fees"
                placeholder="e.g., $25, Free, 2.5%"
                value={feesCharges}
                onChange={(e) => setFeesCharges(e.target.value)}
              />
            </div>
          </form>

          <DialogFooter className="px-6 py-4 border-t">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="service-form"
              disabled={createService.isPending}
            >
              {createService.isPending ? "Submitting..." : "Submit Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function StatsOverview({ total }: { total: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Services"
        value={total}
        icon={ServicesIcon}
        variant="blue"
      />
    </div>
  );
}

function ServicesTable({
  services,
  onDelete,
}: {
  services: Service[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="border-b border-gray-200">
            <TableHead className="py-3.5 px-4 text-left">ID</TableHead>
            <TableHead className="py-3.5 px-4 text-left">
              Service Type
            </TableHead>
            <TableHead className="py-3.5 px-4 text-left">Description</TableHead>
            <TableHead className="py-3.5 px-4 text-left">
              Specifications
            </TableHead>
            <TableHead className="py-3.5 px-4 w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ServiceRow({
  service,
  onDelete,
}: {
  service: Service;
  onDelete: (id: number) => void;
}) {
  return (
    <TableRow className="border-b border-gray-100 hover:bg-gray-50/30 transition-colors">
      <TableCell className="py-3 px-4 font-medium text-gray-900">
        {service.id}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {service.serviceType}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {service.description || "No description"}
      </TableCell>
      <TableCell className="py-3 px-4 text-gray-700">
        {service.specifications && service.specifications.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {service.specifications.map((spec, idx) => (
              <span
                key={`${service.id}-spec-${idx}`}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
              >
                {spec}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">No specs</span>
        )}
      </TableCell>
      <TableCell className="py-3 px-4 text-right">
        <ServiceActions serviceId={service.id} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}

function ServiceActions({
  serviceId,
  onDelete,
}: {
  serviceId: number;
  onDelete: (id: number) => void;
}) {
  return (
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
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="flex items-center gap-2 w-full text-left"
          >
            <Pencil className="h-4 w-4 text-gray-700" />
            Edit
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <button
            type="button"
            onClick={() => onDelete(serviceId)}
            className="flex items-center gap-2 w-full text-left text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
