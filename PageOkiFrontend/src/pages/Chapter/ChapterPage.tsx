// src/pages/ChapterPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { mockTitles, mockChapters } from "../../mocks/titles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChapterPage: React.FC = () => {
    const { title_id, chapter_id } = useParams<{ title_id: string; chapter_id: string }>();
    const titleId = Number(title_id);
    const chapterId = Number(chapter_id);
    const navigate = useNavigate();
    const { updateHistory } = useContext(AuthContext);

    const title = mockTitles.find((t) => t.id === titleId);
    const chapter = mockChapters[chapterId];

    const [currentPage, setCurrentPage] = useState<number>(() => {
        const savedPage = localStorage.getItem(`lastPage_${titleId}_${chapterId}`);
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem(`lastPage_${titleId}_${chapterId}`, currentPage.toString());
        updateHistory(titleId, chapterId, currentPage); // Сохраняем историю
        setLoading(false);
    }, [currentPage, titleId, chapterId, updateHistory]);

    if (!title || !chapter) {
        return <Typography variant="h6">Глава не найдена</Typography>;
    }

    const totalPages = chapter.pages.length;
    const currentImage = chapter.pages[currentPage - 1].imageUrl;

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousChapter = () => {
        const prevChapter = title.chapterList.find((c) => c.id === chapterId - 1);
        if (prevChapter) navigate(`/titles/${titleId}/${prevChapter.id}`);
    };

    const goToNextChapter = () => {
        const nextChapter = title.chapterList.find((c) => c.id === chapterId + 1);
        if (nextChapter) navigate(`/titles/${titleId}/${nextChapter.id}`);
    };

    return (
        <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                {title.title} - Глава {chapter.number}
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Box sx={{ mb: 2 }}>
                        <IconButton onClick={goToPreviousChapter} disabled={chapterId === 1}>
                            <ArrowBack />
                        </IconButton>
                        <IconButton onClick={goToPreviousPage} disabled={currentPage === 1}>
                            <ArrowBack />
                        </IconButton>
                        <Typography component="span" sx={{ mx: 2 }}>
                            Страница {currentPage} из {totalPages}
                        </Typography>
                        <IconButton onClick={goToNextPage} disabled={currentPage === totalPages}>
                            <ArrowForward />
                        </IconButton>
                        <IconButton
                            onClick={goToNextChapter}
                            disabled={chapterId === title.chapterList.length}
                        >
                            <ArrowForward />
                        </IconButton>
                    </Box>
                    <Box sx={{ maxWidth: "800px", margin: "auto" }}>
                        <img src={currentImage} alt={`Page ${currentPage}`} style={{ width: "100%" }} />
                    </Box>
                </>
            )}
            <Button
                variant="contained"
                component={Link}
                to={`/titles/${titleId}`}
                sx={{ mt: 2 }}
            >
                Назад к тайтлу
            </Button>
        </Box>
    );
};

export default ChapterPage;