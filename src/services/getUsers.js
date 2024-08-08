import { supabase } from "../utils/supabaseClient";

export  async function getUsers() {
    try {
      
const { data: { users }, error } = await supabase.auth.admin.listUsers()
      if (error) {
        console.error(error);
        return;
      }
     return users;
    } catch (error) {
      console.error(error);
    }
  }

  