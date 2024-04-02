'use client'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/app/lib/Redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected = RootState>(
    selector: (state: RootState) => TSelected
  ) => useSelector<RootState, TSelected>(selector);