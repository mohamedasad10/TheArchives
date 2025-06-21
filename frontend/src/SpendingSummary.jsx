import React from "react";

function SpendingSummary({ items }) {
  const validItems = items.filter(
    (item) => item.price !== "" && item.price !== null && !isNaN(item.price)
  );

  const totalSpent = validItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const spentPerTag = {};
  const spentPerYear = {};

  validItems.forEach((item) => {
    const tag = item.tag || "Uncategorized";
    const year = item.year || "Unknown";

    spentPerTag[tag] = (spentPerTag[tag] || 0) + Number(item.price);
    spentPerYear[year] = (spentPerYear[year] || 0) + Number(item.price);
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4 text-purple-600">💰 Spending Summary</h2>
      <p className="mb-4">
        <strong>Total Spent:</strong>{" "}
        <span className="text-green-500 font-bold">R{totalSpent.toFixed(2)}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📁 By Tag
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {Object.entries(spentPerTag).map(([tag, amount]) => (
              <li key={tag}>
                {tag}: <span className="text-green-400 font-semibold">R{amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📅 By Year
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {Object.entries(spentPerYear).map(([year, amount]) => (
              <li key={year}>
                {year}: <span className="text-blue-400 font-semibold">R{amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SpendingSummary;
