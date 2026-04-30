import { FunctionComponent } from "react";
import { Logo } from "@/src/components/logo/Logo";

const currentYear = new Date().getFullYear();

export const Footer: FunctionComponent = () => {
  return (
    <footer className="my-container flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
      {/* Left: Logo + description */}
      <div className="flex flex-col gap-2">
        <Logo />
      </div>

      {/* Right: Copyright */}
      <div className="text-sm text-muted-foreground">
        © {currentYear} MyRelay. All rights reserved.
      </div>
    </footer>
  );
};
