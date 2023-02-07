import { describe , it , expect} from "@jest/globals";


const URL_base= "https://citas-medicas-nu.vercel.app/api/v1/";
//const URL_base= "http://127.0.0.1:6005/api/v1/";

describe("Test especialidades get", () => {
    test("It should response ok=true", async () => {
  
        const response = await fetch(URL_base + "specialties");
        const data= await response.json();
        //console.log(data);
        expect(data.ok).toBe(true);
    });
  })
  
  
  describe("Test by specialty get", () => {
    test("It should response ok=true", async () => {
  
        const response = await fetch(URL_base + "specialties/byspecialty/1");
        const data= await response.json();
        //console.log(data);
        expect(data.ok).toBe(true);
    });
  })