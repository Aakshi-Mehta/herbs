-- /migrations/001_init.sql

-- Batches (core herb collections)
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    batch_id UUID UNIQUE NOT NULL,
    herb_type VARCHAR(100) NOT NULL,
    gps_lat DECIMAL(9,6) NOT NULL,
    gps_long DECIMAL(9,6) NOT NULL,
    collected_at TIMESTAMP NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    blockchain_tx TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE batches ADD COLUMN qr_code TEXT;
ALTER TABLE batches ADD COLUMN embedding_hash TEXT;
ALTER TABLE batches ADD COLUMN embedding VECTOR; 

-- Users (collectors, validators, etc.)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    wallet_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
