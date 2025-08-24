CREATE TABLE titles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    alt_names TEXT,
    description VARCHAR(1000),
    type VARCHAR(20) NOT NULL, -- manga/manhwa/manhua
    status VARCHAR(20) NOT NULL, -- ongoing/completed/hiatus
    year SMALLINT,
    author VARCHAR(255),
    image_id INT,
    translator VARCHAR(100),
    team_translator_id INT,
    ratings_count INT DEFAULT 0,
    ratings_sum INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    title_id INT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
    volume INT,
    number SMALLINT NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    likes_count INT DEFAULT 0
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    target_type VARCHAR(20), -- title/cover/chapter/page
    target_id INT,
    chapter_id INT REFERENCES chapters(id) ON DELETE CASCADE,
    page_number INT,
    key VARCHAR(255),
    filename VARCHAR(255),
    content_type VARCHAR(50),
    size INT,
    checksum VARCHAR(64),
    width SMALLINT,
    height SMALLINT,
    storage_url TEXT
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE titles_genres (
    title_id INT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (title_id, genre_id)
);
