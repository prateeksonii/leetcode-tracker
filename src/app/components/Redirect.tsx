"use client";

import { useRouter } from "next/navigation";

export default function RedirectToDashboard() {
  const router = useRouter();
  router.replace("/dashboard");

  return <div>Redirecting to dashboard...</div>;
}
