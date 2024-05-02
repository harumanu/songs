const mongoose = require("mongoose");
const app = require("../app.js");
const request = require("supertest");

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /songs", () => {
  it("Should retreive all songs", async () => {
    const res = await request(app).get("/songs");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          artist: expect.any(String),
          title: expect.any(String),
          album: expect.any(String),
          genre: expect.any(String),
        }),
      ]),
    );
  });
});

describe("POST /songs", () => {
  const mockSong = {
    artist: "Test Artist",
    title: "Test Title",
    album: "Test Album",
    genre: "Test Genre",
  };

  afterAll(async () => {
    await request(app).delete(`/songs/${mockSong._id}`);
  });

  it("Should add a new song entry to the db when provided valid data", async () => {
    const res = await request(app).post("/songs").send(mockSong);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        ...mockSong,
      }),
    );
    mockSong._id = res.body._id;
  });

  it("Should return 400 with an error if provided invalid data", async () => {
    const res = await request(app).post("/songs").send({
      invalid: "data",
    });

    expect(res.status).toEqual(400);
  });
});

describe("PATCH /songs", () => {
  const mockSong = {
    artist: "Test Artist",
    title: "Test Title",
    album: "Test Album",
    genre: "Test Genre",
  };

  beforeEach(async () => {
    const res = await request(app).post("/songs").send(mockSong);
    mockSong._id = res.body._id;
  });

  afterEach(async () => {
    await request(app).delete(`/songs/${mockSong._id}`);
  });

  it("Should update the song record with the new data", async () => {
    const res = await request(app).patch(`/songs/${mockSong._id}`).send({
      artist: "Test Artist 2",
    });
    expect(res.body).toEqual(
      expect.objectContaining({
        ...mockSong,
        artist: "Test Artist 2",
      }),
    );
  });

  it("Should return 404 when the song doesn't exist", async () => {
    const res = await request(app).patch(`/songs/nonsenseId`).send({
      artist: "Test Artist 2",
    });
    expect(res.status).toEqual(404);
  });
});

describe("DELETE /song/:id", () => {
  const mockSong = {
    artist: "Test Artist",
    title: "Test Title",
    album: "Test Album",
    genre: "Test Genre",
  };

  beforeEach(async () => {
    const res = await request(app).post("/songs").send(mockSong);
    mockSong._id = res.body._id;
  });

  afterEach(async () => {
    await request(app).delete(`/songs/${mockSong._id}`);
  });

  it("Should remove the song from the db", async () => {
    const getRes = await request(app).get("/songs");
    expect(getRes.body.some(({ _id }) => _id === mockSong._id)).toBe(true);

    const res = await request(app).delete(`/songs/${mockSong._id}`);

    expect(res.status).toEqual(200);

    const getRes2 = await request(app).get("/songs");
    expect(getRes2.body.some(({ _id }) => _id === mockSong._id)).toBe(false);
  });

  it("Should return 404 if there is no song with the specified id", async () => {
    const res = await request(app).delete(`/songs/nonsensId`);

    expect(res.status).toEqual(404);
  });
});

describe("GET /stats", () => {
  it("Should return stats", async () => {
    const res = await request(app).get("/stats");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(
      expect.objectContaining({
        overallStats: expect.any(Object),
        albumStats: expect.any(Array),
        artistStats: expect.any(Array),
        genreStats: expect.any(Array),
      }),
    );
  });
});
