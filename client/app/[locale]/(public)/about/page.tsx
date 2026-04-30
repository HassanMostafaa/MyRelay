import { AboutPage } from "@/src/page/About/AboutPage";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "About | MyRelay",
  description:
    "Learn how MyRelay transforms business support operations with structured ticket workflows, real-time conversations, and role-based collaboration.",
  openGraph: {
    title: "About | MyRelay",
    description:
      "Learn how MyRelay transforms business support operations with structured ticket workflows, real-time conversations, and role-based collaboration.",
    images: "/brand/logo-emblem-large.png",
    url: `${SITE_URL}/about`,
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function NextjsAboutPage() {
  return <AboutPage />;
}
