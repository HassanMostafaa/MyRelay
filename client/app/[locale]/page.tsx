import { HomePage } from "@/src/page/Home";
import { Metadata } from "next";

// Fallback to localhost if the variable isn't defined
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "MyRelay",
  description:
    "The product has one app, one backend, and one database, but different users see different areas and actions depending on their role.",
  openGraph: {
    title: "MyRelay",
    description:
      "The product has one app, one backend, and one database, but different users see different areas and actions depending on their role.",
    images: "/brand/logo-emblem-large.png",
    url: SITE_URL,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function NextjsPage() {
  return <HomePage />;
}
