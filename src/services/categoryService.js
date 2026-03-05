import toast from 'react-hot-toast';
import supabase from './supabase';

async function getCategories() {
  let { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) toast.error(error.message);

  return categories;
}

export { getCategories };
