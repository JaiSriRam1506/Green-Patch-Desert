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

export async function updateUser({ fullName, password, avatar }) {
  let updateData;

  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw Error("Unable to update User");
  if (!avatar) return data;

  const fileName = `${Date.now()}-${data.user.id}-${avatar?.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw Error("Unable to update Avatars");

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatars: `https://emkkullekiuvljwctdkb.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw Error("Unable to update the URL of avatars");
  console.log(updatedUser);
  return updatedUser;
}
