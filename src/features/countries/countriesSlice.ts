import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { RootState } from '../../store';
import {
  Currencies,
  Flags,
  Languages,
  Name,
} from '../../types/countries.interface';

interface LanguagesType {
  [key: string]: string;
}
interface CurrenciesType {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface CountryNameType {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}
export interface ICountryType {
  cca2?: string;
  cca3?: string;
  name?: CountryNameType;
  capital?: Array<string>;
  currencies?: CurrenciesType;
  languages: LanguagesType;
  flags?: Flags;
}

interface ICountryState {
  isLoading: boolean;
  countries: ICountryType[];
}

const initialState: ICountryState = {
  isLoading: false,
  countries: [
    {
      cca2: '',
      name: {
        common: '',
        official: '',
      },
      capital: [''],
      currencies: {
        USD: {
          name: '',
          symbol: '',
        },
      },
      languages: {
        eng: '',
      },
      flags: {
        png: '',
        svg: '',
      },
    },
  ],
};

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async (countries, thunkApi) => {
    try {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      return res.data;
    } catch (error) {
      let message;
      if (error instanceof AxiosError) message = error.response?.data.error;
      else message = String(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCountries.fulfilled,
      (state, { payload }: PayloadAction<ICountryState | any>) => {
        state.isLoading = false;
        state.countries = payload;
      }
    );
    builder.addCase(
      getCountries.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
  },
});

export default countriesSlice.reducer;
export const {} = countriesSlice.actions;
