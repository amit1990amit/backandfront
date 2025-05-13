import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Alert
} from '@mui/material'
import { getProducts } from '../store/productsSlice'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.productsList)
  const status = useSelector(state => state.products.status)
  const error  = useSelector(state => state.products.error)

  useEffect(() => {
    if (!products?.length) {
      dispatch(getProducts())
    }
  }, [products, dispatch])

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {status === 'failed'  && <Alert severity="error">{error}</Alert>}

      {status === 'idle' && products.length > 0 && (
        <List>
          {products.map(prod => (
            <ListItem key={prod._id}>
              <Typography>
                {prod.name} — ${prod.price}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {status === 'idle' && products.length === 0 && (
        <Typography>No products found.</Typography>
      )}
    </Container>
  )
}

export default ProductsPage
