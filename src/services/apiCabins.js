import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Couldn't get Cabins details");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Couldn't delete Cabin");
  }
  return data;
}

export async function create_Update_Cabins(cabinData, id) {
  const hasImage = typeof cabinData?.image === "string";
  let imageName, imagePath;
  if (!hasImage) {
    imageName =
      Math.ceil(Math.random()) +
      `_${Date.now()}_${cabinData.image.name}`.replaceAll("/", "");
    imagePath = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let query = supabase.from("cabins");

  //1.Create Cabins
  if (!id)
    query = query.insert([
      { ...cabinData, image: imagePath ? imagePath : cabinData.image },
    ]);
  //2. Update Cabins
  else {
    let filePath = hasImage ? cabinData.image : imagePath;
    query = query.update({ ...cabinData, image: filePath }).eq("id", id);
  }

  query = query.select().single();
  const response = await query;
  const { error, data, status } = response;

  if (error) {
    console.log(error);
    throw new Error("Couldn't create/update Cabin");
  }

  //2.Upload Cabins
  //https://emkkullekiuvljwctdkb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  if (!hasImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    if (storageError) {
      console.log(storageError, cabinData);
      const { error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", data.id);
      if (error) {
        console.log(error);
        throw new Error(
          "Couldn't delete Cabin, after issue occurred while uploading image"
        );
      }
      console.log(error);
      throw new Error("Couldn't upload Image");
    }
  }
  return data;
}
