import React, { createContext, useCallback, useState, useContext } from 'react';

import PropsTypes from 'prop-types';
import { Alert } from 'react-native';
import api from '../services/api';

interface ICategorie {
  name: string;
}

interface IDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface IDetailDrink {
  idDrink: string;
  strDrinkThumb: string;
}

interface DrinksContextData {
  loading: boolean;

  getFilters(): void;
  onFilter(typeFilter: string, text: string): void;
  onSearchFilters(strDrink: string): void;

  loadingCategories: boolean;
  categories: string[];

  loadingGlasses: boolean;
  glasses: string[];

  loadingIngredients: boolean;
  ingredients: string[];

  loadingAlcoholic: boolean;
  alcoholic: string[];

  drinks: IDrink[];
  onSearchDrinks(strDrink: string): void;

  detail: IDetailDrink[];
  getDetailDrink(idDrink: string): void;
}

const DrinksContext = createContext<DrinksContextData>({} as DrinksContextData);

const filter = (contents: any[], text: string) => {
  return text.length !== 0
    ? contents.filter(content =>
        content.toLowerCase().startsWith(text.toLowerCase()),
      )
    : contents;
};

const DrinksProvider: React.FC = ({ children }) => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([] as string[]);
  const [allCategories, setAllCategories] = useState([] as string[]);

  const [loadingGlasses, setLoadingGlasses] = useState(false);
  const [glasses, setGlasses] = useState([] as string[]);
  const [allGlasses, setAllGlasses] = useState([] as string[]);

  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredients, setIngredients] = useState([] as string[]);
  const [allIngredients, setAllIngredients] = useState([] as string[]);

  const [loadingAlcoholic, setLoadingAlcoholic] = useState(false);
  const [alcoholic, setAlcoholic] = useState([] as string[]);
  const [allAlcoholic, setAllAlcoholic] = useState([] as string[]);

  const [loading, setLoading] = useState(false);
  const [drinks, setDrinks] = useState([] as IDrink[]);
  const [allDrinks, setAllDrinks] = useState([] as IDrink[]);

  const [detail, setDetail] = useState([] as IDetailDrink[]);

  const getCategories = useCallback(() => {
    async function load() {
      setLoadingCategories(true);
      try {
        const { data } = await api.get('list.php?c=list');
        setCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
        setAllCategories(
          data ? data.drinks.map(drink => drink.strCategory) : [],
        );
      } catch (e) {
        Alert.alert('There was an error fetching the categories');
      }

      setLoadingCategories(false);
    }

    load();
  }, []);

  const onSearchCategories = useCallback(
    (text: string) => {
      setCategories(filter(allCategories, text));
    },
    [allCategories],
  );

  const getGlasses = useCallback(() => {
    async function load() {
      setLoadingGlasses(true);
      try {
        const { data } = await api.get('list.php?g=list');
        setGlasses(data ? data.drinks.map(drink => drink.strGlass) : []);
        setAllGlasses(data ? data.drinks.map(drink => drink.strGlass) : []);
      } catch (e) {
        Alert.alert('There was an error fetching the glasses');
      }

      setLoadingGlasses(false);
    }

    load();
  }, []);

  const onSearchGlasses = useCallback(
    (text: string) => {
      setGlasses(filter(allGlasses, text));
    },
    [allGlasses],
  );

  const getIngredients = useCallback(() => {
    async function load() {
      setLoadingIngredients(true);

      try {
        const { data } = await api.get('list.php?i=list');
        setIngredients(
          data ? data.drinks.map(drink => drink.strIngredient1) : [],
        );
        setAllIngredients(
          data ? data.drinks.map(drink => drink.strIngredient1) : [],
        );
      } catch (e) {
        Alert.alert('There was an error fetching the ingredients');
      }

      setLoadingIngredients(false);
    }

    load();
  }, []);

  const onSearchIngredients = useCallback(
    (text: string) => {
      setIngredients(filter(allIngredients, text));
    },
    [allIngredients],
  );

  const getAlcoholic = useCallback(() => {
    async function load() {
      setLoadingAlcoholic(true);

      try {
        const { data } = await api.get('list.php?a=list');
        setAlcoholic(data ? data.drinks.map(drink => drink.strAlcoholic) : []);
        setAllAlcoholic(
          data ? data.drinks.map(drink => drink.strAlcoholic) : [],
        );
      } catch (e) {
        Alert.alert('There was an error fetching the alcoholic');
      }

      setLoadingAlcoholic(false);
    }

    load();
  }, []);

  const onSearchAlcoholic = useCallback(
    (text: string) => {
      setAlcoholic(filter(allAlcoholic, text));
    },
    [allAlcoholic],
  );

  const getFilters = useCallback(() => {
    getCategories();
    getGlasses();
    getIngredients();
    getAlcoholic();
  }, [getCategories, getGlasses, getIngredients, getAlcoholic]);

  const onSearchFilters = useCallback(
    (strFilter: string) => {
      onSearchCategories(strFilter);
      onSearchGlasses(strFilter);
      onSearchIngredients(strFilter);
      onSearchAlcoholic(strFilter);
    },
    [
      onSearchCategories,
      onSearchGlasses,
      onSearchIngredients,
      onSearchAlcoholic,
    ],
  );

  const getDrinks = useCallback((typeFilter: string, text: string) => {
    async function load() {
      setLoading(true);

      try {
        const { data } = await api.get(
          `filter.php?${typeFilter}=${text.replace(' ', '_')}`,
        );
        setAllDrinks(data ? data.drinks : []);
        setDrinks(data ? data.drinks : []);
      } catch {
        Alert.alert('There was an error fetching the drinks');
      }

      setLoading(false);
    }

    load();
  }, []);

  const onFilter = useCallback(
    (typeFilter: string, text: string) => {
      const filters = {
        alcoholic: 'a',
        categories: 'c',
        glasses: 'g',
        ingredients: 'i',
      };

      const typeFilterLower = typeFilter.toLowerCase();
      const type = filters[typeFilterLower];

      if (!type) return;
      getDrinks(type, text);
    },
    [getDrinks],
  );

  const onSearchDrinks = useCallback(
    (strDrink: string) => {
      setDrinks(filter(allDrinks, strDrink));
    },
    [allDrinks],
  );

  const getDetailDrink = useCallback((idDrink: string) => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await api.get(`lookup.php?i=${idDrink}`);
        setDetail(data ? data.drinks : []);
      } catch {
        Alert.alert('There was an error fetching the drinks');
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <DrinksContext.Provider
      value={{
        loading,

        getFilters,
        onSearchFilters,
        onFilter,

        loadingCategories,
        categories,

        loadingGlasses,
        glasses,

        loadingIngredients,
        ingredients,

        loadingAlcoholic,
        alcoholic,

        drinks,
        onSearchDrinks,

        detail,
        getDetailDrink,
      }}
    >
      {children}
    </DrinksContext.Provider>
  );
};

function useDrinks(): DrinksContextData {
  const context = useContext(DrinksContext);
  if (!context) {
    throw new Error('useDrinks must be used within an AuthProvider');
  }

  return context;
}

export { DrinksProvider, useDrinks };

// DrinksProvider.defaultProps
