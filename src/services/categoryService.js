import supabase from "./supabase";

async function getCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) console.log(error);

  return categories;
}

export { getCategories };
