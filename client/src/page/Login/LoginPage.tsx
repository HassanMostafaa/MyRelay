import { LoginForm } from "@/src/components/forms/login/LoginForm";
import { LoginGuideAside } from "./components/login-guide-aside/LoginGuideAside";
import { LoginHeader } from "./components/login-header/LoginHeader";

export const LoginPage = () => {
  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <LoginHeader />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-10">
        <LoginForm />
        <LoginGuideAside />
      </div>
    </div>
  );
};
