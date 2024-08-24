ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "rating" SET DATA TYPE numeric USING rating::numeric;