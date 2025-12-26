import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from '@/components/common/Layout';
import {
  Dashboard,
  ArticleList,
  Analytics,
  Permissions,
  Workflow,
  Scheduled,
  Tenants,
  Settings,
} from '@/pages/index';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/scheduled" element={<Scheduled />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
