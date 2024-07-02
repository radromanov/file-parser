export function searchReviews(filepath: string) {
  if (!filepath.includes("reviews.json")) {
    throw new Error("Please provide a valid reviews file");
  }
}
