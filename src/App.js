import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ContactList from './components/Contacts/ContactList';
import ContactForm from './components/Contacts/ContactForm';
import { useSelector } from 'react-redux';

const App = () => {
    const token = useSelector(state => state.auth.token);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contacts" element={token ? <ContactList /> : <Login />} />
                <Route path="/contacts/add" element={token ? <ContactForm /> : <Login />} />
                <Route path="/contacts/edit/:id" element={token ? <ContactForm /> : <Login />} />
            </Routes>
        </Router>
    );
};

export default App;
