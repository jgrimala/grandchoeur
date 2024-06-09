
/**
 * storageUtil.js
 * utils\storageUtil.js
 */
//not in used
export function isLocalStorageAvailable() {
    try {
        const test = "test-storage";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}