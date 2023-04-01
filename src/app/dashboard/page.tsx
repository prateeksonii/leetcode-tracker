import { auth } from "@clerk/nextjs/app-beta";
import AddProblem from "../components/AddProblem";
import { prisma } from "@/server/db";

const fetchProblems = async () => {
  const { userId } = auth();
  return prisma.userProblem.findMany({
    where: {
      User: {
        clerkUserId: userId!,
      },
    },
  });
};

export default async function DashboardPage() {
  const problems = await fetchProblems();
  return (
    <main className="mx-auto container py-8">
      <h1 className="text-4xl font-bold">Leetcode Tracker</h1>
      <AddProblem />

      {problems.map((problem) => (
        <div>{problem.problemUrl}</div>
      ))}
    </main>
  );
}
