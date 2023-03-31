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
    },
    update: {
      username: user.username!,
    },
  });
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("layout");

  await upsertUser();
  return <>{children}</>;
}