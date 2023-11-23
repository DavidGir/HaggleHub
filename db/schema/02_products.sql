DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE "products"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "admin_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "thumbnail_photo_url" VARCHAR(255) NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "posted_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "is_sold" BOOLEAN DEFAULT FALSE,
    "current_inventory" INTEGER NOT NULL
);
