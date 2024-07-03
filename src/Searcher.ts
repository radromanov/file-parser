export class Searcher {
  static exec(target: string, file: any) {
    let results: any[] = [];

    function search(file: any) {
      if (Array.isArray(file)) {
        for (const item of file) {
          search(item); // Recur for each item
        }
      } else if (file !== null && typeof file == "object") {
        // If the current object is an object, iterate over its properties
        for (const key in file) {
          if (key === target) {
            // If the key matches the target key, store the value
            results.push(file[key]);
          }
          search(file[key]); // Recur for the property value
        }
      }
    }

    search(file); // Start the recursion
    return results;
  }
}
