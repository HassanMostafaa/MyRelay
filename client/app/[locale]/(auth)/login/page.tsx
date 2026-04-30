import { LoginPage } from "@/src/page/Login/LoginPage";
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
    page: "login",
    path: "/login",
  });
}

const NextjsPage = () => {
  return <LoginPage />;
};

export default NextjsPage;
