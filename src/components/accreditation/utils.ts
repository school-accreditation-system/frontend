export const getRatingBadgeClass = (rating?: string) => {
  switch (rating) {
    case "UNSATISFACTORY":
      return " border-yellow-900 bg-yellow-100 text-yellow-800";
    case "SATISFACTORY":
      return "border-green-900 bg-green-100 text-green-800";
    case "GOOD":
      return "border-blue-900 bg-blue-100 text-blue-800";
    case "OUTSTANDING":
      return "border-purple-900 bg-purple-100 text-purple-800";
    default:
      return "border-gray-900 bg-gray-100 text-gray-800";
  }
};
