import { SECTOR_DETAILS, TVET_DATA } from "../../../../utils/tvetData";

// Generate trade details with descriptions
export const generateTradeDetails = () => {
  const details = {};

  Object.keys(TVET_DATA.sectors).forEach((sector) => {
    const sectorInfo = SECTOR_DETAILS[sector];

    TVET_DATA.sectors[sector].forEach((trade) => {
      // Create a unique ID by replacing spaces and special characters
      const id = trade.replace(/[\s&_-]/g, "").toLowerCase();

      // Determine if it's Level 1 or Level 2
      const level = trade.includes("_L1")
        ? "Level 1"
        : trade.includes("_L2")
        ? "Level 2"
        : null;

      // Clean the trade name for display
      const cleanName = trade.replace(/_L1|_L2/g, "");

      details[id] = {
        id: id,
        name: cleanName,
        fullName: level ? `${cleanName} (${level})` : cleanName,
        originalName: trade,
        sector: sector,
        sectorName: sectorInfo.name,
        sectorColor: sectorInfo.color,
        sectorIcon: sectorInfo.icon,
        level: level,
        description: `This program provides training in ${cleanName.toLowerCase()} techniques and practices.`,
      };
    });
  });

  return details;
};