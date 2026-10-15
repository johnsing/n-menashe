import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">404 — Page not found</h1>
      <p className="mt-2 text-gray-600">הדף לא נמצא</p>
      <Link href="/" className="mt-6 inline-block text-blue-600 underline">
        Back to home
      </Link>
    </div>
  );
}
