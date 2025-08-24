// src/components/Layout.tsx
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/titles", { replace: true }); // Замена текущего маршрута
        window.location.reload(); // Принудительная перезагрузка (можно убрать для SPA)
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        onClick={handleLogoClick} // Обработчик клика
                        sx={{
                            flexGrow: 1,
                            cursor: "pointer", // Изменение курсора для интерактивности
                            "&:hover": {
                                color: "secondary.main",
                            },
                        }}
                    >
                        PageOki
                    </Typography>
                    <Button color="inherit" component={Link} to="/titles">
                        Каталог
                    </Button>
                    {role !== "GUEST" && (
                        <>
                            <Button color="inherit" component={Link} to="/profile">
                                Профиль
                            </Button>
                            {(role === "TRANSLATOR" || role === "ADMIN") && (
                                <Button color="inherit" component={Link} to="/manage-titles">
                                    Управление тайтлами
                                </Button>
                            )}
                            {role === "ADMIN" && (
                                <Button color="inherit" component={Link} to="/admin">
                                    Админ
                                </Button>
                            )}
                            <Button color="inherit" onClick={logout}>
                                Выход
                            </Button>
                        </>
                    )}
                    {role === "GUEST" && (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Войти
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2 }}>
                {children}
            </Box>
        </>
    );
};

export default Layout;