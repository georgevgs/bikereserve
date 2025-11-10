CREATE TABLE "bikes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"size" text NOT NULL,
	"description" text,
	"price_per_day" numeric(10, 2) NOT NULL,
	"image_url" text,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"bike_id" serial NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_phone" varchar(20) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"pickup_time" text,
	"reservation_code" varchar(10) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "reservations_reservation_code_unique" UNIQUE("reservation_code")
);
--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_bike_id_bikes_id_fk" FOREIGN KEY ("bike_id") REFERENCES "public"."bikes"("id") ON DELETE no action ON UPDATE no action;