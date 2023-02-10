import './App.css';

import { Route, Routes } from 'react-router-dom';
import UserTable from './components/userTable';
function App() {

  return (
    <Routes>
    <Route path="/" element={<UserTable />} />
      <Route path="home" element={<UserTable />} />

  </Routes>
  );
}

export default App;
