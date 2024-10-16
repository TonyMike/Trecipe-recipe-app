import axios from "axios";
import { useEffect, useState } from "react";
import { Category, IError } from "../@types/types";

const useGetCategories = (category: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        setSelectedRecipe(response.data.meals);
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [category]);



  return {
    categories,
    selectedRecipe,
    loading,
    error
  }
}

export default useGetCategories;