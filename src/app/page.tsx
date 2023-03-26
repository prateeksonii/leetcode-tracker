import { SignIn } from "@clerk/nextjs/app-beta";

export default async function Home() {
  return (
    <main className="container mx-auto grid grid-cols-2 h-screen place-items-center">
      <h1 className="text-6xl font-extrabold tracking-tight text-zinc-100">
        Track your leetcode progress easily
      </h1>
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
    </main>
  );
}
