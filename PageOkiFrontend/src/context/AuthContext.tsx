// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { UserRole } from "../types/roles";

type BookmarkStatus = "Читаю" | "Брошено" | "Буду читать" | "Прочитано";

interface Bookmark {
    titleId: number;
    status: BookmarkStatus;
}

interface User {
    username: string;
    email: string;
}

interface AuthContextType {
    role: UserRole;
    token: string | null;
    user: User | null;
    login: (emailOrUsername: string, password: string) => void;
    register: (email: string, username: string, password: string) => void;
    logout: () => void;
    loading: boolean;
    error: string | null;
    bookmarks: Bookmark[];
    addBookmark: (titleId: number, status: BookmarkStatus) => void;
    updateBookmarkStatus: (titleId: number, status: BookmarkStatus) => void;
    removeBookmark: (titleId: number) => void;
    history: { titleId: number; chapterId: number; page: number }[];
    updateHistory: (titleId: number, chapterId: number, page: number) => void;
}

export const AuthContext = createContext<AuthContextType>({
    role: "GUEST",
    token: null,
    user: null,
    login: () => {},
    register: () => {},
    logout: () => {},
    loading: false,
    error: null,
    bookmarks: [],
    addBookmark: () => {},
    updateBookmarkStatus: () => {},
    removeBookmark: () => {},
    history: [],
    updateHistory: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<UserRole>((localStorage.getItem("role") as UserRole) || "GUEST");
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || "mock-token");
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(
        JSON.parse(localStorage.getItem("bookmarks") || "[]")
    );
    const [history, setHistory] = useState<{ titleId: number; chapterId: number; page: number }[]>(
        JSON.parse(localStorage.getItem("history") || "[]")
    );

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && !user) {
            const mockUsername = `User${Math.floor(Math.random() * 1000)}`;
            const mockEmail = `${mockUsername.toLowerCase()}@example.com`;
            const mockUser = { username: mockUsername, email: mockEmail };
            localStorage.setItem("user", JSON.stringify(mockUser));
            setUser(mockUser);
            const mockRole = localStorage.getItem("role") as UserRole;
            setRole(mockRole || "GUEST");
        }
    }, []);

    const login = (emailOrUsername: string, password: string) => {
        setLoading(true);
        setError(null);
        if (!emailOrUsername || !password) {
            setError("Заполните все поля");
            setLoading(false);
            return;
        }
        const mockRole = emailOrUsername.includes("admin") ? "ADMIN" : "USER";
        const mockToken = `mock-token-${Date.now()}`;
        const mockUsername = `User${Math.floor(Math.random() * 1000)}`;
        const mockEmail = `${mockUsername.toLowerCase()}@example.com`;
        const mockUser = { username: mockUsername, email: mockEmail };
        localStorage.setItem("token", mockToken);
        localStorage.setItem("role", mockRole);
        localStorage.setItem("user", JSON.stringify(mockUser));
        setToken(mockToken);
        setRole(mockRole);
        setUser(mockUser);
        setLoading(false);
    };

    const register = (email: string, username: string, password: string) => {
        setLoading(true);
        setError(null);
        if (!email || !username || !password) {
            setError("Заполните все поля");
            setLoading(false);
            return;
        }
        const mockRole = "USER";
        const mockToken = `mock-token-${Date.now()}`;
        const mockUser = { username, email };
        localStorage.setItem("token", mockToken);
        localStorage.setItem("role", mockRole);
        localStorage.setItem("user", JSON.stringify(mockUser));
        setToken(mockToken);
        setRole(mockRole);
        setUser(mockUser);
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("bookmarks");
        localStorage.removeItem("history");
        setToken(null);
        setRole("GUEST");
        setUser(null);
        setBookmarks([]);
        setHistory([]);
        setError(null);
    };

    const addBookmark = (titleId: number, status: BookmarkStatus) => {
        if (!bookmarks.some((b) => b.titleId === titleId)) {
            const newBookmarks = [...bookmarks, { titleId, status }];
            setBookmarks(newBookmarks);
            localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
        }
    };

    const updateBookmarkStatus = (titleId: number, status: BookmarkStatus) => {
        const newBookmarks = bookmarks.map((b) =>
            b.titleId === titleId ? { ...b, status } : b
        );
        setBookmarks(newBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    };

    const removeBookmark = (titleId: number) => {
        const newBookmarks = bookmarks.filter((b) => b.titleId !== titleId);
        setBookmarks(newBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    };

    const updateHistory = (titleId: number, chapterId: number, page: number) => {
        const newHistory = [
            { titleId, chapterId, page },
            ...history.filter((h) => h.titleId !== titleId || h.chapterId !== chapterId),
        ].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem("history", JSON.stringify(newHistory));
    };

    return (
        <AuthContext.Provider
            value={{
                role,
                token,
                user,
                login,
                register,
                logout,
                loading,
                error,
                bookmarks,
                addBookmark,
                updateBookmarkStatus,
                removeBookmark,
                history,
                updateHistory,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};