DROP TABLE IF EXISTS product_categories CASCADE;
CREATE TABLE "product_categories"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
    "category_id" INTEGER REFERENCES categories(id) ON DELETE CASCADE,
);
