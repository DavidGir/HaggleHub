DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE "messages"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "product_id" INTEGER REFERENCES products(id) ON DELETE CASCADE,
    "sender_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "receiver_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "content" VARCHAR(255),
    "sent_date" TIMESTAMP(0) WITHOUT TIME ZONE
);
