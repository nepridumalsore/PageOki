// src/pages/AdminPanel.tsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Chip,
} from "@mui/material";
import { mockTitles, Title } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminPanel: React.FC = () => {
    const { role } = useContext(AuthContext);
    const [titles, setTitles] = useState<Title[]>(mockTitles);
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState<Partial<Title>>({
        id: titles.length + 1,
        title: "",
        type: "манга",
        genres: [],
        coverImage: "https://via.placeholder.com/150",
        description: "",
        chapters: 0,
        chapterList: [],
    });
    const [editTitle, setEditTitle] = useState<Title | null>(null);

    if (role !== "ADMIN") {
        return <Typography variant="h6">Доступ запрещен</Typography>;
    }

    const handleAddOpen = () => {
        setNewTitle({
            id: titles.length + 1,
            title: "",
            type: "манга",
            genres: [],
            coverImage: "https://via.placeholder.com/150",
            description: "",
            chapters: 0,
            chapterList: [],
        });
        setOpen(true);
    };

    const handleEditOpen = (title: Title) => {
        setEditTitle({ ...title });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditTitle(null);
    };

    const handleSave = () => {
        if (editTitle) {
            // Редактирование
            const updatedTitles = titles.map((t) => (t.id === editTitle.id ? editTitle : t));
            setTitles(updatedTitles);
            localStorage.setItem("mockTitles", JSON.stringify(updatedTitles));
        } else {
            // Добавление
            const updatedTitles = [...titles, newTitle as Title];
            setTitles(updatedTitles);
            localStorage.setItem("mockTitles", JSON.stringify(updatedTitles));
        }
        handleClose();
    };

    const handleDelete = (id: number) => {
        const updatedTitles = titles.filter((t) => t.id !== id);
        setTitles(updatedTitles);
        localStorage.setItem("mockTitles", JSON.stringify(updatedTitles));
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const genres = event.target.value.split(",").map((g) => g.trim());
        editTitle
            ? setEditTitle({ ...editTitle, genres })
            : setNewTitle({ ...newTitle, genres });
    };

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const coverImage = event.target.value;
        editTitle
            ? setEditTitle({ ...editTitle, coverImage })
            : setNewTitle({ ...newTitle, coverImage });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Админ-панель
            </Typography>
            <Button variant="contained" onClick={handleAddOpen} sx={{ mb: 2 }}>
                Добавить тайтл
            </Button>
            <Grid container spacing={2}>
                {titles.map((title) => (
                    <Grid item xs={12} sm={6} key={title.id}>
                        <Card>
                            <CardMedia component="img" height="200" image={title.coverImage} alt={title.title} />
                            <CardContent>
                                <Typography variant="h6">{title.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Тип: {title.type} | Глав: {title.chapters}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Жанры: {title.genres.join(", ")}
                                </Typography>
                                <Button variant="outlined" onClick={() => handleEditOpen(title)} sx={{ mr: 1 }}>
                                    Редактировать
                                </Button>
                                <Button variant="outlined" color="error" onClick={() => handleDelete(title.id)}>
                                    Удалить
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editTitle ? "Редактировать тайтл" : "Добавить тайтл"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название"
                        value={editTitle?.title || newTitle.title}
                        onChange={(e) =>
                            editTitle
                                ? setEditTitle({ ...editTitle, title: e.target.value })
                                : setNewTitle({ ...newTitle, title: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        label="Тип"
                        value={editTitle?.type || newTitle.type}
                        onChange={(e) =>
                            editTitle
                                ? setEditTitle({
                                    ...editTitle,
                                    type: e.target.value as "манга" | "манхва" | "маньхуа",
                                })
                                : setNewTitle({
                                    ...newTitle,
                                    type: e.target.value as "манга" | "манхва" | "маньхуа",
                                })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        SelectProps={{ native: true }}
                    >
                        <option value="манга">Манга</option>
                        <option value="манхва">Манхва</option>
                        <option value="маньхуа">Маньхуа</option>
                    </TextField>
                    <TextField
                        label="Жанры (через запятую, например: шонен, фэнтези)"
                        value={(editTitle?.genres || newTitle.genres || []).join(", ")}
                        onChange={handleGenreChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="URL обложки"
                        value={editTitle?.coverImage || newTitle.coverImage}
                        onChange={handleCoverImageChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Описание"
                        value={editTitle?.description || newTitle.description}
                        onChange={(e) =>
                            editTitle
                                ? setEditTitle({ ...editTitle, description: e.target.value })
                                : setNewTitle({ ...newTitle, description: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Количество глав"
                        type="number"
                        value={editTitle?.chapters || newTitle.chapters}
                        onChange={(e) =>
                            editTitle
                                ? setEditTitle({ ...editTitle, chapters: Number(e.target.value) })
                                : setNewTitle({ ...newTitle, chapters: Number(e.target.value) })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPanel;