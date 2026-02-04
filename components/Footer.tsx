 export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} . All rights reserved.
        </p>
      </div>
    </footer>
  );
}