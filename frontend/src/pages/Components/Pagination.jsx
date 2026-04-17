export default function Pagination({ total, page, setPage }) {
  const pages = Math.ceil(total / 10);

  return (
    <div className="flex justify-center gap-2 mt-10">
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 border rounded ${
            page === i + 1 ? "bg-black text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}