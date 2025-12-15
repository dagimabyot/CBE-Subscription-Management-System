// components/statusBadge.ts
import { cva, type VariantProps } from "class-variance-authority";

export const statusBadge = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium leading-4",
  {
    variants: {
      status: {
        approved: "bg-green-100 text-green-700",
        amended_approved: "bg-purple-100 text-purple-700",
        pending: "bg-yellow-100 text-yellow-700",
        rejected: "bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export type StatusBadgeProps = VariantProps<typeof statusBadge>;
