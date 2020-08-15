import React, { createContext, useCallback, useState, useContext } from 'react';

import PropsTypes from 'prop-types';
import api from '../services/api';

interface ICategorie {
  name: string;
}

interface IDrink {
  name: string;
}

interface IDetailDrink {
  name: string;
}

interface DrinksContextData {
  loading: boolean;

  categories: ICategorie[];
  getCategories(): void;
  onFilterCategories(text: string): void;

  drinks: IDrink[];
  getDrinks(idCategorie: string): void;

  detail: IDetailDrink;
  getDetailDrink(idDrink: string): void;
}

const DrinksContext = createContext<DrinksContextData>({} as DrinksContextData);

const DrinksProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([] as string[]);
  const [allCategories, setAllCategories] = useState([] as string[]);
  const [drinks, setDrinks] = useState([] as IDrink[]);
  const [detail, setDetail] = useState({} as IDetailDrink);

  const getCategories = useCallback(() => {
    setCategories([]);

    async function load() {
      setLoading(true);
      const { data } = await api.get('list.php?c=list');
      setCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
      setAllCategories(data ? data.drinks.map(drink => drink.strCategory) : []);
      setLoading(false);
    }

    load();
  }, []);

  const onFilterCategories = useCallback(
    (text: string) => {
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
    setLoading(true);
    setDrinks([]);
    setLoading(false);
  }, []);

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
        onFilterCategories,

        drinks,
        getDrinks,

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
