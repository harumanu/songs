import { ISong } from "./reducers/songs";

const api = {
  getSongs: async () => {
    const resp = await fetch("http://localhost:5000/songs");
    const json = await resp.json();
    return json;
  },

  addSong: async (song: ISong) => {
    const resp = await fetch("http://localhost:5000/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
    const json = await resp.json();
    return json;
  },

  editSong: async (song: ISong) => {
    const resp = await fetch(`http://localhost:5000/songs/${song._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
    const json = await resp.json();
    return json;
  },

  deleteSong: async (id: number) => {
    await fetch(`http://localhost:5000/songs/${id}`, {
      method: "DELETE",
    });
  },
  getStats: async () => {
    const resp = await fetch("http://localhost:5000/stats");
    const json = await resp.json();
    return json;
  },
};

export default api;
