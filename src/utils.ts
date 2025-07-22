export const categorizeEvent = (title: string, notes?: string): "Work" | "Personal" | "Other" => {
  const text = (title + (notes ?? "")).toLowerCase();

  const workKeywords = ["meeting", "project", "client", "deadline", "office"];
  const personalKeywords = ["birthday", "family", "love", "party", "anniversary", "holiday"];

  if (workKeywords.some(k => text.includes(k))) return "Work";
  if (personalKeywords.some(k => text.includes(k))) return "Personal";
  return "Other";
};
