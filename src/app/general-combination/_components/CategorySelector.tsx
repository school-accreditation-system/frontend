"use client";
import { CATEGORY_ICONS } from "../../../constants/CombinationsData";

const CategorySelector = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Type of Request</h2>
        <div className="border rounded-lg p-3 mt-2">
          <div className="font-medium">General Combinations</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Select Category</h2>
        <p className="text-sm text-gray-500 mb-4">
          Click on a category to view available combinations
        </p>

        {Object.keys(categories).map((category) => (
          <div
            key={category}
            className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer transition-all ${
              selectedCategory === category
                ? "border-blue-500 bg-blue-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="text-2xl mr-3">
              {CATEGORY_ICONS[category]}
            </span>
            <div>
              <div className="font-medium">{category}</div>
              <div className="text-sm text-gray-500">
                {categories[category].length} combinations
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;