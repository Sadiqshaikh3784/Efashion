export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="font-medium">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="rounded-full"
        />
      </div>
    </div>
  );
}