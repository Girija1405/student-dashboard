export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Student Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">
        Analyze student performance, skills, and progress.
      </p>
      <a
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go to Dashboard
      </a>
    </main>
  );
}
