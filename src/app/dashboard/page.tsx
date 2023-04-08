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
      <table className="table w-full">
        <thead>
          <tr className="text-left bg-zinc-900">
            <th>Problem URL</th>
            <th># Times solved</th>
            <th>Last solved at</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id} className="p-2">
              <td>{problem.problemUrl}</td>
              <td>{problem.count}</td>
              <td>{problem.lastSolved.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
