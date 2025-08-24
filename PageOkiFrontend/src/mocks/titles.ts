// src/mocks/titles.ts
import { UserRole } from "../types/roles";

export interface Title {
    id: number;
    title: string;
    type: "манга" | "манхва" | "маньхуа";
    genres: string[];
    coverImage: string;
    description: string;
    chapters: number;
    chapterList: { id: number; number: number }[];
}

export interface ChapterPage {
    id: number;
    imageUrl: string;
}

export interface Chapter {
    id: number;
    number: number;
    pages: ChapterPage[];
}

export const mockTitles: Title[] = [
    {
        id: 1,
        title: "Наруто",
        type: "манга",
        genres: ["шонен", "приключения", "фэнтези"],
        coverImage: "https://via.placeholder.com/150",
        description: "История о ниндзя по имени Наруто.",
        chapters: 700,
        chapterList: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, number: i + 1 })),
    },
    {
        id: 2,
        title: "Башня Бога",
        type: "манхва",
        genres: ["фэнтези", "экшен", "драма"],
        coverImage: "https://via.placeholder.com/150",
        description: "Подъем по таинственной башне.",
        chapters: 500,
        chapterList: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, number: i + 1 })),
    },
    {
        id: 3,
        title: "Сололева",
        type: "маньхуа",
        genres: ["романтика", "комедия"],
        coverImage: "https://via.placeholder.com/150",
        description: "Романтическая история в школе.",
        chapters: 200,
        chapterList: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, number: i + 1 })),
    },
];

// Мок-данные для страниц глав (упрощенный пример)
export const mockChapters: Record<number, Chapter> = {
    1: {
        id: 1,
        number: 1,
        pages: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://via.placeholder.com/800x1200?text=Page ${i + 1}`,
        })),
    },
    2: {
        id: 2,
        number: 2,
        pages: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://via.placeholder.com/800x1200?text=Page ${i + 1}`,
        })),
    },
    3: {
        id: 3,
        number: 3,
        pages: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://via.placeholder.com/800x1200?text=Page ${i + 1}`,
        })),
    },
    4: {
        id: 4,
        number: 4,
        pages: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://via.placeholder.com/800x1200?text=Page ${i + 1}`,
        })),
    },
    5: {
        id: 5,
        number: 5,
        pages: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://via.placeholder.com/800x1200?text=Page ${i + 1}`,
        })),
    },
};