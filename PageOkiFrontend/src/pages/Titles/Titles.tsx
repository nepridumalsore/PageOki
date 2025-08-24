// src/pages/Titles.tsx
import React, { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Pagination,
    TextField,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import { mockTitles, Title } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

type BookmarkStatus = "Читаю" | "Брошено" | "Буду читать" | "Прочитано";

const Titles: React.FC = () => {
    const [filteredTitles, setFilteredTitles] = useState<Title[]>(mockTitles);
    const [page, setPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [genreFilter, setGenreFilter] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const { role, bookmarks, addBookmark, updateBookmarkStatus, removeBookmark } = useContext(AuthContext);
    const titlesPerPage = 2;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTitleId, setSelectedTitleId] = useState<number | null>(null);

    // Фильтрация
    const applyFilters = () => {
        let result = mockTitles;
        if (typeFilter) result = result.filter((title) => title.type === typeFilter);
        if (genreFilter) result = result.filter((title) => title.genres.includes(genreFilter));
        if (searchQuery)
            result = result.filter((title) =>
                title.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        setFilteredTitles(result);
        setPage(1); // Сброс страницы при фильтрации
    };

    // Пагинация
    const paginatedTitles = filteredTitles.slice(
        (page - 1) * titlesPerPage,
        page * titlesPerPage
    );
    const totalPages = Math.ceil(filteredTitles.length / titlesPerPage);

    const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>, titleId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedTitleId(titleId);
    };

    const handleStatusSelect = (status: BookmarkStatus) => {
        if (selectedTitleId !== null) {
            const existingBookmark = bookmarks.find((b) => b.titleId === selectedTitleId);
            if (existingBookmark) {
                updateBookmarkStatus(selectedTitleId, status);
            } else {
                addBookmark(selectedTitleId, status);
            }
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedTitleId(null);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Каталог тайтлов
            </Typography>
            {/* Фильтры */}
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Поиск по названию"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <TextField
                    select
                    label="Тип"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    sx={{ mr: 2 }}
                    SelectProps={{ native: true }}
                >
                    <option value="">Все</option>
                    <option value="манга">Манга</option>
                    <option value="манхва">Манхва</option>
                    <option value="маньхуа">Маньхуа</option>
                </TextField>
                <TextField
                    select
                    label="Жанр"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="">Все</option>
                    <option value="шонен">Шонен</option>
                    <option value="фэнтези">Фэнтези</option>
                    <option value="романтика">Романтика</option>
                    <option value="комедия">Комедия</option>
                    <option value="экшен">Экшен</option>
                    <option value="драма">Драма</option>
                </TextField>
                <Button variant="contained" onClick={applyFilters} sx={{ ml: 2 }}>
                    Применить
                </Button>
            </Box>

            {/* Карточки тайтлов */}
            <Grid container spacing={2}>
                {paginatedTitles.map((title) => {
                    const bookmark = bookmarks.find((b) => b.titleId === title.id);
                    return (
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
                                    <Typography variant="body2">{title.description}</Typography>
                                    {role !== "GUEST" && (
                                        <>
                                            <Button
                                                variant="outlined"
                                                sx={{ mt: 1 }}
                                                onClick={(e) => handleBookmarkClick(e, title.id)}
                                            >
                                                {bookmark
                                                    ? `${bookmark.status} (Изменить)`
                                                    : "Добавить в закладки"}
                                            </Button>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedTitleId === title.id}
                                                onClose={handleClose}
                                            >
                                                {(["Читаю", "Брошено", "Буду читать", "Прочитано"] as const).map(
                                                    (status) => (
                                                        <MenuItem
                                                            key={status}
                                                            onClick={() => handleStatusSelect(status)}
                                                        >
                                                            {status}
                                                        </MenuItem>
                                                    )
                                                )}
                                                {bookmark && (
                                                    <MenuItem onClick={() => removeBookmark(title.id)}>
                                                        Удалить
                                                    </MenuItem>
                                                )}
                                            </Menu>
                                        </>
                                    )}
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 1, ml: 1 }}
                                        component={Link}
                                        to={`/titles/${title.id}`}
                                    >
                                        Читать
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Пагинация */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default Titles;