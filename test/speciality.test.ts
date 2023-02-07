import { describe , it , expect} from "@jest/globals";


const URL_base= "https://citas-medicas-nu.vercel.app/api/v1/";

describe("Test especialidades get", () => {
    test("It should response ok=true", async () => {
  
        const response = await fetch(URL_base + "specialties");
        const data= await response.json();
        expect(data.ok).toBe(true);
    });
  })
  
  
  describe("Test by specialty get", () => {
    test("It should response ok=true", async () => {
  
        const response = await fetch(URL_base + "specialties/byspecialty/1");
        const data= await response.json();
        expect(data.ok).toBe(true);
    });
  })