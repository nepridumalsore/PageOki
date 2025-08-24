// src/pages/TitlePage.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import { mockTitles } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

type BookmarkStatus = "Читаю" | "Брошено" | "Буду читать" | "Прочитано";

const TitlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const titleId = Number(id);
    const title = mockTitles.find((t) => t.id === titleId);
    const { role, bookmarks, addBookmark, updateBookmarkStatus, removeBookmark } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    if (!title) {
        return <Typography variant="h6">Тайтл не найден</Typography>;
    }

    const bookmark = bookmarks.find((b) => b.titleId === titleId);

    const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleStatusSelect = (status: BookmarkStatus) => {
        if (bookmark) {
            updateBookmarkStatus(titleId, status);
        } else {
            addBookmark(titleId, status);
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Card>
                <CardMedia component="img" height="300" image={title.coverImage} alt={title.title} />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {title.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Тип: {title.type}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Жанры: {title.genres.join(", ")}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        {title.description}
                    </Typography>
                    {role !== "GUEST" && (
                        <>
                            <Button
                                variant="outlined"
                                sx={{ mt: 1 }}
                                onClick={handleBookmarkClick}
                            >
                                {bookmark
                                    ? `${bookmark.status} (Изменить)`
                                    : "Добавить в закладки"}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
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
                                    <MenuItem onClick={() => removeBookmark(titleId)}>
                                        Удалить
                                    </MenuItem>
                                )}
                            </Menu>
                        </>
                    )}
                </CardContent>
            </Card>

            <Box sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Список глав
                </Typography>
                <List>
                    {title.chapterList.map((chapter) => (
                        <ListItem key={chapter.id}>
                            <ListItemText primary={`Глава ${chapter.number}`} />
                            <Button
                                variant="contained"
                                component={Link}
                                to={`/titles/${title.id}/${chapter.id}`}
                                sx={{ ml: 2 }}
                            >
                                Читать
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default TitlePage;