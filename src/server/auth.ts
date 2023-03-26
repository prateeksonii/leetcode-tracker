import { auth } from "@clerk/nextjs/app-beta";

export function hasUser() {
  const { userId } = auth();
  return !!userId;
}
