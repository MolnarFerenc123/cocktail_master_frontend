import { useState, useEffect, useCallback } from 'react';
import { GetCocktailDetails } from '../../domain/usecases/GetCocktailDetails';

export const CocktailDetailViewModel = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCocktailDetailsUseCase = new GetCocktailDetails();

  const loadCocktail = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getCocktailDetailsUseCase.execute(id);
      
      if (result) {
        setCocktail(result);
      } else {
        setError("Nem sikerült betölteni az adatokat.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cocktail,
    loading,
    error,
    loadCocktail
  };
};