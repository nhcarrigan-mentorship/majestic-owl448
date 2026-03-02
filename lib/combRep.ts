// https://stackoverflow.com/questions/32543936/combination-with-repetition
function combRep<T>(arr: T[], l?: number): T[][] {
    if (l === void 0) l = arr.length; // Length of the combinations
    const data: T[] = Array(l), // Used to store state
        results: T[][] = []; // Array of results
    (function f(pos: number, start: number) {
        // Recursive function
        if (pos === l) {
            // End reached
            results.push(data.slice()); // Add a copy of data to results
            return;
        }
        for (let i = start; i < arr.length; ++i) {
            data[pos] = arr[i]; // Update data
            f(pos + 1, i); // Call f recursively
        }
    })(0, 0); // Start at index 0
    return results; // Return results
}

export default combRep;
