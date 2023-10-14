const supertest = require("supertest");
const server = require("../server/server");
const request = supertest(server);

describe("Test server endpoints", () => {
    test("Get geonames location", async () => {
        const res = await request
            .post("/get-geonames-location")
            .send({ location: "Paris" });

        expect(res.statusCode).toEqual(200);
    });

    test("Get all saved trips", async () => {
        const res = await request.get("/get-saved-trips");

        expect(res.statusCode).toEqual(200);
    });

    afterAll(() => {
        server.close();
    });
});
