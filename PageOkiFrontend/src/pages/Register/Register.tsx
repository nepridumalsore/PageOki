import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !username || !password) {
            setError("Заполните все поля");
            return;
        }
        try {
            await register(email, username, password);
            navigate("/login");
        } catch (err) {
            setError("Регистрация неудачна");
        }
    };

    return (
        <Paper sx={{ maxWidth: 400, margin: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>Регистрация</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Зарегистрироваться</Button>
            </Box>
        </Paper>
    );
};

export default Register;