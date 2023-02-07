
import { describe , it , expect} from "@jest/globals";

const URL_base= "https://citas-medicas-nu.vercel.app/api/v1/";
//const URL_base= "http://127.0.0.1:6005/api/v1/";

describe("Test pacientes get", () => {
    test("It may should response ok=true", async () => {
  
        const response = await fetch(URL_base + "patient");
        const data= await response.json();
        expect(data.ok).toBe(true);
    });
  })
  
  
