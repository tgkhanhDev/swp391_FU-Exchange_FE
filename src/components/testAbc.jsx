import React from 'react'
import { useDispatch } from 'react-redux'
import { getProductThunk } from '../store/productManagement/thunk';

export const TestAbc = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={()=>{dispatch(getProductThunk())}}>TestAbc</button>
  )
}

export default TestAbc