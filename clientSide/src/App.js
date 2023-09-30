import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './components/library/NavBar';
import AddStudents from './components/pages/AddStudents';
import StudentsList from './components/pages/StudentsList';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <AddStudents />   */}
      {/* <StudentsList /> */}
      <AppRoutes />
    </div>
  );
}

export default App;
