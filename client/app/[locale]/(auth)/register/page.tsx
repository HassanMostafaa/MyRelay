import { RegisterPage } from "@/src/page/Register/RegisterPage";
import { createPageMetadata } from "@/src/lib/page-metadata";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    page: "register",
    path: "/register",
  });
}

const NextjsPage = () => {
  return <RegisterPage />;
};

export default NextjsPage;
