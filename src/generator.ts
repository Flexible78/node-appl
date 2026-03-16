export function generateLotto(count: number, min: number, max: number): number[] {
    const numbers = new Set<number>();
    while (numbers.size <= count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
}
