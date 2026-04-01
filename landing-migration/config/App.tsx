import './scss/landing.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Landing } from '@/pages/landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </Router>
  );
}

export default App;
