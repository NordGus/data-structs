import { IllegalArgumentError } from "../shared/Errors";
import Stack from "../shared/SimpleStack";

class StringUtils {
    public static countVowels(str: string): number {
        if (!str) return 0;

        const vowels = new Set<string>(["A", "E", "I", "O", "U"])
        let count = 0;

        for (const char of str) if (vowels.has(char.toUpperCase())) count++;

        return count;
    }

    public static reverse(str: string): string {
        if (!str) return str;

        let output = "";

        for (let i = str.length - 1; i >= 0; i--) output = `${output}${str[i]}`;
        
        return output;
    }

    public static reverseWords(str: string): string {
        if (!str) return str;
        
        return str.trim().split(" ").reverse().join(" ");
    }

    public static isRotations(str1: string, str2: string): boolean {
        return (str1.length === str2.length && (str1 + str1).includes(str2));
    }

    public static removeDuplicateCharacters(str: string): string {
        if (!str) return "";

        const seen = new Set<string>();
        let output = "";

        for (const char of str) {
            if (!seen.has(char)) {
                seen.add(char);
                output = `${output}${char}`
            }
        }

        return output;
    }

    public static mostRepeatedChar(str: string): string {
        if (!str) throw new IllegalArgumentError();
        if (str.length === 0) throw new IllegalArgumentError();

        const seen = new Map<string, number>();
        let max = 0;
        let maxChar = ""

        for (const char of str) {
            if (!seen.has(char)) {
                seen.set(char, 1);
                continue;
            }

            seen.set(char, seen.get(char) + 1)
        }

        for (const [char, count] of seen.entries()) {
            if (count > max) {
                maxChar = char;
                max = count;
            }
        }

        return maxChar;
    }

    public static capitalize(sentence: string): string {
        if (!sentence) return "";

        const words = sentence.trim().replace(/\s+/g, " ").split(" ");
        let output = "";

        for (const word of words) {
            const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

            if (output.length === 0) output = capitalized;
            else output = `${output} ${capitalized}`;
        }

        return output;
    }

    public static areAnagrams(str1: string, str2: string): boolean {
        if (str1 === null || str2 === null) return false
        
        const word1 = new Map<string, number>();
        for (const char of str1.toLocaleLowerCase()) {
            if (!word1.has(char)) word1.set(char, 1);
            else word1.set(char, word1.get(char) + 1);
        }

        const word2 = new Map<string, number>();
        for (const char of str2.toLocaleLowerCase()) {
            if (!word2.has(char)) word2.set(char, 1);
            else word2.set(char, word2.get(char) + 1);
        }

        for (const char of word1.keys()) {
            if (word1.get(char) !== word2.get(char)) return false;
        }

        return true;
    }

    public static palindrome(str: string): boolean {
        if (str === null) return false;

        return str === this.reverse(str);
    }
}

export default StringUtils;