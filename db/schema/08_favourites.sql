DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE "favourites"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
    "added_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
