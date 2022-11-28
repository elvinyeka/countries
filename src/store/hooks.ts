import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '.';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecetor: TypedUseSelectorHook<RootState> = useSelector;
