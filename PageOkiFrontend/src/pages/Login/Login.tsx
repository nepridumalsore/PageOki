import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";

const Login: React.FC = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailOrUsername || !password) {
            setError("Заполните все поля");
            return;
        }
        try {
            await login(emailOrUsername, password);
            navigate("/");
        } catch (err) {
            setError("Неверные данные");
        }
    };

    return (
        <Paper sx={{ maxWidth: 400, margin: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>Вход</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Email или имя пользователя"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Войти</Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </Box>
        </Paper>
    );
};

export default Login;