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
import { ICountryType } from '../countries/countriesSlice';

interface LanguagesType {
  [key: string]: string;
}
export interface CurrenciesType {
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

interface ICountryState {
  isLoading: boolean;
  country: ICountryType;
}
export type AsyncThunkConfig = {
  state: RootState;
};

const initialState: ICountryState = {
  isLoading: false,
  country: {
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
};

export const getCountry = createAsyncThunk<
  object,
  string | undefined,
  AsyncThunkConfig
>('countries/getCountry', async (cca3, thunkApi) => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
    return res.data[0];
  } catch (error) {
    let message;
    if (error instanceof AxiosError) message = error.response?.data.error;
    else message = String(error);
    console.log(error);
    return thunkApi.rejectWithValue(message);
  }
});

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCountry.fulfilled,
      (state, { payload }: PayloadAction<ICountryType | any>) => {
        state.isLoading = false;
        state.country = payload;
      }
    );
    builder.addCase(
      getCountry.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
  },
});

export default countrySlice.reducer;
export const {} = countrySlice.actions;
