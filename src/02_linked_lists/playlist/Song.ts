class Song {
  public name: string;
  public artist: string;

  constructor(name: string, artist?: string) {
    this.name = name;
    this.artist = artist;
  }
}

export default Song;
