import { prisma } from "@/server/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import React from "react";

const upsertUser = async () => {
  const user = await currentUser();

  if (!user) return;

  await prisma.user.upsert({
    where: {
      clerkUserId: user.id,
    },
    create: {
      username: user.username!,
      clerkUserId: user.id,
      email:
        user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
          ?.emailAddress ?? "",
    },
    update: {
      username: user.username!,
      email:
        user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
          ?.emailAddress ?? "",
    },
  });
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await upsertUser();
  return <>{children}</>;
}
