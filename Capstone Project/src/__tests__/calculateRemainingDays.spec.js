import { calculateRemainingDays } from "../client/scripts/calculateRemainingDays";

test("Validate calculate remaining days function should return a correct number of days diff", () => {
    // set a mock time for today
    jest.useFakeTimers().setSystemTime(new Date("2023-10-14"));
    const inputDate = "2023-10-20";
    const expectedResult = 6;

    expect(calculateRemainingDays(inputDate)).toEqual(expectedResult);
});
