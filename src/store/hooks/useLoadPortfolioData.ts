import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  loadPortfolioData,
  loadPortfolioDataSuccess,
  loadPortfolioDataError,
} from '../slices/portfolioSlice'
import portfolioData from '../../data/portfolio.json'
import type { AppDispatch } from '../store'

export const useLoadPortfolioData = () => {
  const dispatch = useDispatch<AppDispatch>()

  const loadData = useCallback(async () => {
    try {
      dispatch(loadPortfolioData())
      // Simular pequeño delay para cargar datos
      await new Promise((resolve) => setTimeout(resolve, 500))
      dispatch(loadPortfolioDataSuccess(portfolioData))
    } catch (error) {
      dispatch(
        loadPortfolioDataError(
          error instanceof Error ? error.message : 'Error al cargar los datos'
        )
      )
    }
  }, [dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  return loadData
}
