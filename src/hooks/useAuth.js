export { useAuth } from "../context/AuthContext";

// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { supabase } from "../services/supabaseClient";

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   const { user, session, loading } = context;

//   async function login(email, password) {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;

//     return data;
//   }

//   async function signup(email, password, extraData = {}) {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) throw error;

//     const authUser = data?.user;

//     if (authUser) {
//       const fullName =
//         extraData.full_name ||
//         extraData.name ||
//         authUser.user_metadata?.full_name ||
//         authUser.email?.split("@")[0] ||
//         "User";

//       const { error: profileError } = await supabase
//         .from("profiles")
//         .upsert(
//           {
//             id: authUser.id,
//             email: authUser.email,
//             full_name: fullName,
//           },
//           { onConflict: "id" }
//         );

//       if (profileError) {
//         console.error("Profile creation error:", profileError);
//       }
//     }

//     return data;
//   }

//   async function logout() {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//   }

//   return {
//     user,
//     session,
//     loading,
//     login,
//     signup,
//     logout,
//     isAuthenticated: !!user,
//   };
// }