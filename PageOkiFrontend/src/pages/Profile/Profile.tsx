// src/pages/Profile.tsx
import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { mockTitles } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
    const { user, bookmarks, history, logout } = useContext(AuthContext);

    if (!user) {
        return <Typography variant="h6">Пожалуйста, войдите</Typography>;
    }

    const bookmarkedTitles = mockTitles.filter((title) =>
        bookmarks.some((b) => b.titleId === title.id)
    );

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Профиль
            </Typography>
            <Typography variant="h6">Информация о пользователе</Typography>
            <Typography>Имя: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Роль: {user.role}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
                Закладки
            </Typography>
            {bookmarks.length === 0 ? (
                <Typography>У вас нет закладок</Typography>
            ) : (
                <List>
                    {bookmarkedTitles.map((title) => {
                        const bookmark = bookmarks.find((b) => b.titleId === title.id);
                        return (
                            <ListItem key={title.id}>
                                <ListItemText
                                    primary={title.title}
                                    secondary={bookmark ? `Статус: ${bookmark.status}` : "Без статуса"}
                                />
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/titles/${title.id}`}
                                    sx={{ ml: 2 }}
                                >
                                    Читать
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>
            )}

            <Typography variant="h6" sx={{ mt: 2 }}>
                История чтения
            </Typography>
            {history.length === 0 ? (
                <Typography>История пуста</Typography>
            ) : (
                <List>
                    {history.map((h, index) => {
                        const title = mockTitles.find((t) => t.id === h.titleId);
                        return (
                            title && (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={title.title}
                                        secondary={`Глава ${h.chapterId}, Страница ${h.page}`}
                                    />
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to={`/titles/${h.titleId}/${h.chapterId}`}
                                        sx={{ ml: 2 }}
                                    >
                                        Продолжить
                                    </Button>
                                </ListItem>
                            )
                        );
                    })}
                </List>
            )}

            <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
                Выйти
            </Button>
        </Box>
    );
};

export default Profile;