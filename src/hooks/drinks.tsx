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
  name: string;
}

interface DrinksContextData {
  loading: boolean;

  categories: string[];
  getCategories(): void;
  onSearchCategories(text: string): void;

  drinks: IDrink[];
  getDrinks(idCategorie: string): void;
  onSearchDrinks(strDrink: string): void;

  detail: IDetailDrink;
  getDetailDrink(idDrink: string): void;
}

const DrinksContext = createContext<DrinksContextData>({} as DrinksContextData);

const DrinksProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([] as string[]);
  const [allCategories, setAllCategories] = useState([] as string[]);

  const [drinks, setDrinks] = useState([] as IDrink[]);
  const [allDrinks, setAllDrinks] = useState([] as IDrink[]);

  const [detail, setDetail] = useState({} as IDetailDrink);

  const getCategories = useCallback(() => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await api.get('list.php?c=list');
        setCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
        setAllCategories(
          data ? data.drinks.map(drink => drink.strCategory) : [],
        );
      } catch (e) {
        Alert.alert('There was an error fetching the categories');
      }

      setLoading(false);
    }

    load();
  }, []);

  const onSearchCategories = useCallback(
    (text: string) => {
      console.log('onSearchCategories');
      setCategories(
        text.length !== 0
          ? allCategories.filter(
              categorie =>
                categorie.toLowerCase().indexOf(text.toLowerCase()) >= 0,
            )
          : allCategories,
      );
    },
    [allCategories],
  );

  const getDrinks = useCallback((idCategorie: string) => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await api.get(
          `filter.php?c=${idCategorie.replace(' ', '_')}`,
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

  const onSearchDrinks = useCallback(
    (strDrink: string) => {
      async function load() {
        setDrinks(
          strDrink.length !== 0
            ? allDrinks.filter(
                drink => drink.strDrink.toLowerCase().indexOf(strDrink) >= 0,
              )
            : allDrinks,
        );
      }

      load();
    },
    [allDrinks],
  );

  const getDetailDrink = useCallback((idDrink: string) => {
    setLoading(true);
    setDetail({});
    setLoading(false);
  }, []);

  return (
    <DrinksContext.Provider
      value={{
        loading,

        categories,
        getCategories,
        onSearchCategories,

        drinks,
        getDrinks,
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
