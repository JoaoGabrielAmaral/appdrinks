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

  categories: string[];
  glasses: string[];
  ingredients: string[];
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
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([] as string[]);
  const [allCategories, setAllCategories] = useState([] as string[]);

  const [glasses, setGlasses] = useState([] as string[]);
  const [allGlasses, setAllGlasses] = useState([] as string[]);

  const [ingredients, setIngredients] = useState([] as string[]);
  const [allIngredients, setAllIngredients] = useState([] as string[]);

  const [alcoholic, setAlcoholic] = useState([] as string[]);
  const [allAlcoholic, setAllAlcoholic] = useState([] as string[]);

  const [drinks, setDrinks] = useState([] as IDrink[]);
  const [allDrinks, setAllDrinks] = useState([] as IDrink[]);

  const [detail, setDetail] = useState([] as IDetailDrink[]);

  const getCategories = useCallback(async () => {
    try {
      const { data } = await api.get('list.php?c=list');
      setCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
      setAllCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
    } catch (e) {
      Alert.alert('There was an error fetching the categories');
    }
  }, []);

  const onSearchCategories = useCallback(
    (text: string) => {
      setLoading(true);
      setCategories(filter(allCategories, text));
      setLoading(false);
    },
    [allCategories],
  );

  const getGlasses = useCallback(async () => {
    try {
      const { data } = await api.get('list.php?g=list');
      setGlasses(data ? data.drinks.map(drink => drink.strGlass) : []);
      setAllGlasses(data ? data.drinks.map(drink => drink.strGlass) : []);
    } catch (e) {
      Alert.alert('There was an error fetching the glasses');
    }
  }, []);

  const onSearchGlasses = useCallback(
    (text: string) => {
      setLoading(true);
      setGlasses(filter(allGlasses, text));
      setLoading(false);
    },
    [allGlasses],
  );

  const getIngredients = useCallback(async () => {
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
  }, []);

  const onSearchIngredients = useCallback(
    (text: string) => {
      setLoading(true);
      setIngredients(filter(allIngredients, text));
      setLoading(false);
    },
    [allIngredients],
  );

  const getAlcoholic = useCallback(async () => {
    try {
      const { data } = await api.get('list.php?a=list');
      setAlcoholic(data ? data.drinks.map(drink => drink.strAlcoholic) : []);
      setAllAlcoholic(data ? data.drinks.map(drink => drink.strAlcoholic) : []);
    } catch (e) {
      Alert.alert('There was an error fetching the alcoholic');
    }
  }, []);

  const onSearchAlcoholic = useCallback(
    (text: string) => {
      setLoading(true);
      setAlcoholic(filter(allAlcoholic, text));
      setLoading(false);
    },
    [allAlcoholic],
  );

  const getFilters = useCallback(() => {
    async function load() {
      setLoading(true);
      await getCategories();
      await getGlasses();
      await getIngredients();
      await getAlcoholic();
      setLoading(false);
    }

    load();
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
      setDrinks(
        strDrink.length !== 0
          ? allDrinks.filter(drink =>
              drink.strDrink.toLowerCase().startsWith(strDrink.toLowerCase()),
            )
          : allDrinks,
      );
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

        categories,
        glasses,
        ingredients,
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
