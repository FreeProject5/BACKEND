import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

export const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL as string,
  process.env.SUPABASE_API_KEY as string
);

