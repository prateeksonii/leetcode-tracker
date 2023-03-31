import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import RedirectToDashboard from "./components/Redirect";

export default async function Home() {
  return (
    <>
      <SignedIn>
        <RedirectToDashboard />
      </SignedIn>
      <SignedOut>
        <main className="container mx-auto grid grid-cols-2 h-screen place-items-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-zinc-100">
            Track your leetcode progress easily
          </h1>
          <SignIn signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
        </main>
      </SignedOut>
    </>
  );
}
