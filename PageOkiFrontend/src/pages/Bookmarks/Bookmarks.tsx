// src/pages/Bookmarks.tsx
import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { mockTitles } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Bookmarks: React.FC = () => {
    const { bookmarks } = useContext(AuthContext);

    const bookmarkedTitles = mockTitles.filter((title) => bookmarks.includes(title.id));

    if (bookmarks.length === 0) {
        return <Typography variant="h6">У вас нет закладок</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Закладки
            </Typography>
            <Grid container spacing={2}>
                {bookmarkedTitles.map((title) => (
                    <Grid item xs={12} sm={6} key={title.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={title.coverImage}
                                alt={title.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{title.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Тип: {title.type} | Глав: {title.chapters}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Жанры: {title.genres.join(", ")}
                                </Typography>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={`/titles/${title.id}`}
                                    sx={{ mt: 1 }}
                                >
                                    Читать
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default Bookmarks;