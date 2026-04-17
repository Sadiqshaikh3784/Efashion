import { useNavigate } from "react-router";

const categories = [
  "all",
  "men",
  "women",
  "kids",
  "footwear",
  "electronics",
  "beauty",
  "winter",     
  "bags",       
  "watches"    
];

export default function CategorySection() {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat === "all") {
      navigate("/");
    } else {
      navigate(`/?category=${cat}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="flex gap-4 overflow-x-auto no-scrollbar">

        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleClick(cat)}
            className={`flex-shrink-0 px-6 py-3 rounded-full cursor-pointer text-sm font-medium transition
              ${
                cat === "all"
                  ? "bg-black text-white"
                  : "bg-white border hover:bg-black hover:text-white"
              }
            `}
          >
            {cat === "all"
              ? "All"
              : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}

      </div>
    </div>
  );
}