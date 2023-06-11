export function deepClone(array) {
    return array.map(stack => [...stack])
}