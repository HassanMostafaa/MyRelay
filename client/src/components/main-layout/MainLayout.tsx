import { FunctionComponent, PropsWithChildren } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const MainLayout: FunctionComponent<PropsWithChildren> = async ({
  children,
}) => {
  return (
    <main className="min-h-dvh flex flex-col">
      <Header />
      <section className="flex-1">{children}</section>
      <Footer />
    </main>
  );
};
