import { RegisterForm } from "@/src/components/forms/register/RegisterForm";

import { RegisterHeader } from "./components/register-header/RegisterHeader";
import { RegisterGuideAside } from "./components/register-guide-aside/RegisterGuideAside";

export const RegisterPage = () => {
  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <RegisterHeader />

      <div className="flex lg:items-start lg:flex-row flex-col gap-4 xl:gap-10">
        <RegisterForm />
        <RegisterGuideAside />
      </div>
    </div>
  );
};
