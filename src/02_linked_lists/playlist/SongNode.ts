import Song from "./Song";

class SongNode {
  private value: Song;
  private prevAddress: SongNode | null;
  private nextAddress: SongNode | null;

  constructor(song: Song) {
    this.value = song;
    this.nextAddress = null;
    this.prevAddress = null;
  }

  public get song(): Song {
    return this.value;
  }

  public get next(): SongNode | null {
    return this.nextAddress;
  }

  public set next(node: SongNode | null) {
    this.nextAddress = node;
  }

  public get prev(): SongNode | null {
    return this.prevAddress;
  }

  public set prev(node: SongNode | null) {
    this.prevAddress = node;
  }
}

export default SongNode;
