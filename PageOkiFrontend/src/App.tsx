import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Titles from './pages/Titles/Titles';
import TitlePage from './pages/Titles/TitlePage';
import Profile from './pages/Profile/Profile';
import AdminPanel from './pages/Admin/AdminPanel';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ChapterPage from "./pages/Chapter/ChapterPage";
import Bookmarks from './pages/Bookmarks/Bookmarks';

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Titles />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/titles" element={<Titles />} />
                    <Route path="/titles/:id" element={<TitlePage />} />
                    <Route path="/titles/:title_id/:chapter_id" element={<ChapterPage />} />
                    <Route
                        path="/bookmarks"
                        element={
                            <ProtectedRoute allowedRoles={["USER", "TRANSLATOR", "ADMIN"]}>
                                <Bookmarks />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute allowedRoles={["USER", "TRANSLATOR", "ADMIN"]}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;