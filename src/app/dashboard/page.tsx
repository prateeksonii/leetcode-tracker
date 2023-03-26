import AddProblem from "../components/AddProblem";

export default function DashboardPage() {
  return (
    <main className="mx-auto container py-8">
      <h1 className="text-4xl font-bold">Leetcode Tracker</h1>
      <AddProblem />
    </main>
  );
}
