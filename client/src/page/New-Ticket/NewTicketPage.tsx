import { CreateTicketForm } from "@/src/components/create-ticket-form/CreateTicketForm";
import { NewTicketGuideAside } from "./components/new-ticket-guide-aside/NewTicketGuideAside";
import { NewTicketHeader } from "./components/new-ticket-header/NewTicketHeader";

export const NewTicketPage = () => {
  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <NewTicketHeader />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-10">
        <div className="w-full">
          <CreateTicketForm />
        </div>
        <div className="w-full lg:max-w-sm">
          <NewTicketGuideAside />
        </div>
      </div>
    </div>
  );
};
