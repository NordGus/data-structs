import Playlist from "./Playlist";
import Song from "./Song";

describe("Playlist", () => {
  let playlist: Playlist;

  let data = [
    new Song("The Sky is a Neighborhood", "Foo Fighters"),
    new Song("Holding Poison", "Foo Fighters"),
    new Song("Walk", "Foo Fighters"),
  ];

  const fillPlaylist = () => {
    data.forEach((song) => playlist.add(song));
  };

  beforeEach(() => (playlist = new Playlist()));

  it("is initialized empty", () => {
    expect(playlist.current).toBeFalsy();
    expect(playlist.size).toBe(0);
  });

  it("should return its size", () => {
    expect(playlist.size).toBe(0);
  });

  describe("should let you add songs", () => {
    it("to the end", () => {
      const song = new Song("The Sky is a Neighborhood", "Foo Fighters");
      playlist.add(song);

      expect(playlist.current).toEqual(song);
      expect(playlist.size).toBe(1);
    });

    it("next", () => {
      fillPlaylist();

      const nextSong = new Song("Everlong", "Foo Fighters");

      playlist.addNext(nextSong);

      expect(playlist.current).toEqual(data[0]);
      expect(playlist.next).toEqual(nextSong);
    });
  });

  describe("should let you remove songs", () => {
    beforeEach(() => fillPlaylist());

    describe("given an index", () => {
      it("throws an error if the list is empty", () => {
        const list = new Playlist();

        try {
          list.remove(0);
        } catch (error) {
          expect(error.message).toBe("empty list");
        }
      });

      it("in bounds", () => {
        playlist.remove(0);

        expect(playlist.size).toBe(2);
      });

      it("out of bounds, index >= playlist size", () => {
        try {
          playlist.remove(10);
        } catch (error) {
          expect(error.message).toBe("illegal argument");
        }

        expect(playlist.size).toBe(3);
      });

      it("out of bounds, index < 0", () => {
        try {
          playlist.remove(-1);
        } catch (error) {
          expect(error.message).toBe("illegal argument");
        }

        expect(playlist.size).toBe(3);
      });
    });

    describe("current", () => {
      it("throws an error if the list is empty", () => {
        const list = new Playlist();

        try {
          list.removeCurrent();
        } catch (error) {
          expect(error.message).toBe("empty list");
        }
      });

      it("removes the current element", () => {
        playlist.removeCurrent();

        expect(playlist.current).not.toEqual(data[0]);
        expect(playlist.size).toBe(2);

        playlist.removeCurrent();

        expect(playlist.current).not.toEqual(data[1]);
        expect(playlist.size).toBe(1);

        playlist.removeCurrent();

        expect(playlist.current).toEqual(null);
        expect(playlist.size).toBe(0);
      });
    });
  });

  describe("should let you change the current song", () => {
    beforeEach(() => fillPlaylist());
    it("to the next song", () => {
      playlist.playNext();

      expect(playlist.current).toEqual(data[1]);

      playlist.playNext();

      expect(playlist.current).toEqual(data[2]);

      playlist.playNext();

      expect(playlist.current).toEqual(null);

      playlist.playNext();

      expect(playlist.current).toEqual(data[0]);
    });

    it("to the previos song", () => {
      playlist.playPrev();

      expect(playlist.current).toEqual(null);

      playlist.playPrev();

      expect(playlist.current).toEqual(data[2]);
    });
  });
});
