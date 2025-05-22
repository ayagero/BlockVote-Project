// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import VoterDashboard from './pages/VoterDashboard';
import PublicPolls from './pages/PublicPolls';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null); // null, 'admin', 'voter'

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin">
              <AdminDashboard setUserRole={setUserRole} />
            </Route>
            <Route path="/voter">
              <VoterDashboard setUserRole={setUserRole} />
            </Route>
            <Route path="/polls" component={PublicPolls} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;