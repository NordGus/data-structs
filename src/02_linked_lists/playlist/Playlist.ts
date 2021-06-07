import { EmptyListError, IllegalArgumentError } from "../../shared/Errors";
import Song from "./Song";
import SongNode from "./SongNode";

class Playlist {
  private first: SongNode;
  private last: SongNode;
  private active: SongNode;
  private count: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.active = null;
    this.count = 0;
  }

  public get current(): Song {
    if (this.active) return this.active.song;
    return null;
  }

  public get next(): Song {
    if (this.active && this.active.next) return this.active.next.song;
    return null;
  }

  public get prev(): Song {
    if (this.active && this.active.prev) return this.active.prev.song;
    return null;
  }

  public get size(): number {
    return this.count;
  }

  public add(song: Song): void {
    let node = new SongNode(song);

    if (this.isEmpty()) this.first = this.last = this.active = node;
    else {
      node.prev = this.last;
      this.last.next = node;
      this.last = node;
    }

    this.count++;
  }

  public addNext(song: Song): void {
    let node = new SongNode(song);

    if (this.isEmpty()) this.first = this.last = this.active = node;
    else {
      node.next = this.active.next;
      node.prev = this.active;

      this.active.next.prev = node;
      this.active.next = node;

      if (this.last === this.active) this.last = this.active.next;
    }

    this.count++;
  }

  public remove(index: number): void {
    if (this.isEmpty()) throw new EmptyListError();
    if (this.isAllmostEmpty()) {
      this.first = this.last = this.active = null;
      this.count--;
      return;
    }

    let current = this.first;

    for (let i = 0; current; i++, current = current.next) {
      if (i !== index) continue;

      if (current === this.active) this.active = this.active.next;
      if (current === this.last) this.last = this.last.prev;
      if (current === this.first) this.first = this.first.next;

      if (current.prev) current.prev.next = current.next;
      if (current.next) current.next.prev = current.prev;

      current.next = current.prev = null;

      this.count--;
      return;
    }

    throw new IllegalArgumentError();
  }

  public removeCurrent(): void {
    if (this.isEmpty()) throw new EmptyListError();
    if (this.isAllmostEmpty()) this.first = this.last = this.active = null;
    else {
      const current = this.active;

      if (current === this.last) this.last = this.last.prev;
      if (current === this.first) this.first = this.first.next;

      if (this.active.next) this.active.next.prev = current.prev;
      if (this.active.prev) this.active.prev.next = current.next;
      this.active = this.active.next;

      current.next = current.prev = null;
    }

    this.count--;
  }

  public playNext(): void {
    if (this.isEmpty()) throw new EmptyListError();

    if (this.active) this.active = this.active.next;
    else this.active = this.first;
  }

  public playPrev(): void {
    if (this.isEmpty()) throw new EmptyListError();

    if (this.active) this.active = this.active.prev;
    else this.active = this.last;
  }

  private isEmpty(): boolean {
    return !this.first;
  }

  private isAllmostEmpty(): boolean {
    return (
      this.active === this.last &&
      this.active === this.first &&
      this.first === this.last
    );
  }
}

export default Playlist;
