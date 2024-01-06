import supabase from "./supabase";

export async function login({ email, pass }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  if (error) throw Error("Unable to login due to: ", error);
  return data;
}

export async function register({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      name,
    },
  });
  if (error) throw Error("Unable to Sign Up User");
  return data;
}

export async function getUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: user } = await supabase.auth.getUser();
  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw Error("Unable to logout");
}
