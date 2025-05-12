import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/'
const URL = `${BASE_URL}products`

const initialState = {
  productsList: [],
  favoriteProductsList: [],
  selectedFavoritePlayers: {},
  status: 'idle'
}

// Thunks
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL)
      return response.data || []
    } catch (err) {
      console.error('Error fetching products:', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/create`, newProduct)
      return response.data
    } catch (err) {
      console.error('Error creating product:', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/delete/${productId}`)
      return productId
    } catch (err) {
      console.error('Error deleting product:', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct, { rejectWithValue }) => {
    try {
      await axios.put(`${URL}/update`, updatedProduct)
      return updatedProduct
    } catch (err) {
      console.error('Error updating product:', err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // getProducts
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.productsList = [...state.productsList, ...action.payload]
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'failed'
      })

      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'idle'
        // assuming API returns { product: { … } }
        state.productsList.push(action.payload.product || action.payload)
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'failed'
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'idle'
        state.productsList = state.productsList.filter(
          p => p._id !== action.payload
        )
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed'
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'idle'
        const updated = action.payload
        const idx = state.productsList.findIndex(p => p._id === updated._id)
        if (idx !== -1) {
          state.productsList[idx] = updated
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export default productsSlice.reducer
