import { RegisterForm } from "@/src/components/forms/register/RegisterForm";

import { RegisterHeader } from "./components/register-header/RegisterHeader";
import { RegisterGuideAside } from "./components/register-guide-aside/RegisterGuideAside";

export const RegisterPage = () => {
  return (
    <div className="space-y-6 py-6 lg:space-y-8 lg:py-12">
      <RegisterHeader />

      <div className="flex items-start gap-10">
        <RegisterForm />
        <RegisterGuideAside />
      </div>
    </div>
  );
};
