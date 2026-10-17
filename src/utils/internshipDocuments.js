
export const INTERNSHIP_DOCUMENT_LABELS = {
  OFFER_LETTER: "Offer Letter",
  COMPLETION_CERTIFICATE: "Completion Certificate",
  COMPLETION_LETTER: "Completion Letter",
  FINAL_REPORT: "Final Report",
  OTHER: "Supporting Document",
};

export const formatMissingDocuments = (message = "") => {
  const prefix = "Required documents are missing:";

  if (!message.includes(prefix)) return null;

  return message
    .slice(message.indexOf(prefix) + prefix.length)
    .split(",")
    .map((type) => type.trim())
    .filter(Boolean)
    .map((type) => INTERNSHIP_DOCUMENT_LABELS[type] || type);
};
