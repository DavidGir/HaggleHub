DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE "reviews"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
    "rating" INTEGER NOT NULL,
    "review" VARCHAR(255)
);
