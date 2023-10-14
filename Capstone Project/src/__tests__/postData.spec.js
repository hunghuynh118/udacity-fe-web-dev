import { postData } from "../client/scripts/postData";

const axios = require("axios");

jest.mock("axios");

test("Validate post data function should return a correct response data", async () => {
    const inputLocation = "Paris";
    const inputUrl = "http://localhost:3001/get-geonames-location";
    const expectedResult = {
        lat: "48.85341",
        lon: "2.3488",
        name: "Paris",
        geonameId: 2988507,
    };

    const response = await postData(inputUrl, { location: inputLocation });
    expect(response).toEqual(expectedResult);
});
