import { COMBINATIONS_DATA } from "@/constants/CombinationsData";

// Helper to extract abbreviation from a combination string
const getAbbreviation = (combinationString) => {
    const match = combinationString.match(/\(([^)]+)\)/);
    return match ? match[1] : "";
  };

export const generateCombinationDetails = () => {
  const details = {};
  
  Object.keys(COMBINATIONS_DATA.categories).forEach(category => {
    COMBINATIONS_DATA.categories[category].forEach(combo => {
      const abbr = getAbbreviation(combo);
      const subjects = combo.replace(` (${abbr})`, "").split(" - ");
      
      let description = "";
      if (category === "Sciences") {
        description = `A combination focused on physical and mathematical sciences. Ideal for careers in engineering, medicine, and research.`;
      } else if (category === "Humanities") {
        description = `This combination explores social sciences and cultural studies. Great for careers in education, psychology, and social work.`;
      } else if (category === "Languages") {
        description = `A comprehensive language combination for translation, international relations, and communication careers.`;
      }
      
      details[abbr] = {
        id: abbr,
        name: combo.replace(` (${abbr})`, ""),
        fullName: combo,
        description: description,
        subjects: subjects,
        category: category
      };
    });
  });
  
  return details;
};