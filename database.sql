create TABLE delivery(
    id SERIAL PRIMARY KEY,
    date DATE,
    title VARCHAR(255),
    count INTEGER,
    distance INTEGER
);