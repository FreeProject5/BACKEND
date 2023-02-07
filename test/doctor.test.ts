
import { describe , it , expect} from "@jest/globals";


const URL_base= "https://citas-medicas-nu.vercel.app/api/v1/";

describe("Test doctor GET", () => {
  it("It should response 200", async () => {

      const response = await fetch(URL_base + "doctor");
      const data= await response.json();
      expect(data.data.status).toBe(200);
  });
})



describe("Test doctor get by id", () => {
  it("It should response 200", async () => {

      const response = await fetch(URL_base + "doctor/1");
      const data= await response.json();
      expect(data.data.status).toBe(200);
  });
})


describe("Test doctor schedule get", () => {
  test("It should response 200", async () => {

      const response = await fetch(URL_base + "doctor/findAll/Schedule");
      const data= await response.json();
      expect(data.data.status).toBe(200);
  });
})



describe("Test doctor schedule get by id", () => {
  test("It should response 200", async () => {

      const response = await fetch(URL_base + "doctor/findAll_schedule/5");
      const data= await response.json();
      expect(data.data.status).toBe(200);
  });
})
