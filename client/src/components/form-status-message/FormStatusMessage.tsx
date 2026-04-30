import { cn } from "@/src/lib/utils";
import { ApiStatus } from "@/src/services/users/utils/types";

type FormStatus = {
  status: ApiStatus;
  message: string;
} | null;

type Props = {
  formStatus: FormStatus;
  className?: string;
};

export const FormStatusMessage = ({ formStatus, className }: Props) => {
  if (!formStatus?.message) return null;

  const isSuccess = formStatus.status === "success";

  return (
    <p
      className={cn(
        "text-xs col-span-full p-4 bg-linear-to-r to-transparent font-bold",
        isSuccess ? "from-primary/50" : "from-red-800/30",
        className,
      )}
      aria-live="polite"
    >
      {formStatus.message}
    </p>
  );
};
