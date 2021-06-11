class CharacterFinder {
  private str: string;

  constructor(str: string) {
    if (typeof str !== "string") throw new Error("illegal argument");

    this.str = str;
  }

  // O(n²)
  firstNonRepeatedChar(): string {
    const repMap = this.fillDictionary(); // O(n)

    // O(n)
    for (let i = 0; i < this.str.length; i++) {
      const char = this.str[i].toLowerCase();
      if (repMap.get(char) === 1) return char;
    }

    return null;
  }

  // O(n)
  firstRepeatedChar(): string {
    const charSet = new Set<string>();

    // O(n)
    for (let i = 0; i < this.str.length; i++) {
      const char = this.str[i].toLowerCase();
      if (charSet.has(char)) return char;
      charSet.add(char);
    }

    return null;
  }

  // O(1)
  get string(): string {
    return this.str;
  }

  // O(n)
  private fillDictionary(): Map<string, number> {
    const dict = new Map<string, number>();

    for (let i = 0; i < this.str.length; i++) {
      const char = this.str[i].toLowerCase();
      const count = dict.has(char) ? dict.get(char) : 0;
      dict.set(char, count + 1);
    }

    return dict;
  }
}

export default CharacterFinder;
