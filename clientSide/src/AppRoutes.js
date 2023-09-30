import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AddStudents from './components/pages/AddStudents';
import StudentsList from './components/pages/StudentsList';

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' Component={AddStudents} />
            <Route path='/data' Component={StudentsList} />
        </Routes>
    </div>
  )
}

export default AppRoutes;