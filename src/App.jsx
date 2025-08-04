import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './component/form/Form';
import Table from './component/table/Table';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
