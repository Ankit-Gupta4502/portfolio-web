import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('megaphone', 'share-2', 'search', 'globe', 'map-pin', 'target', 'trending-up', 'users', 'lightbulb', 'rocket', 'bar-chart-3', 'heart-pulse', 'graduation-cap', 'building-2', 'shopping-cart', 'briefcase', 'store', 'star', 'award', 'zap', 'palette', 'camera', 'pen-tool', 'layout-grid', 'smartphone', 'monitor', 'compass', 'line-chart', 'handshake', 'shield-check', 'message-circle');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('new', 'contacted', 'won', 'lost');
  CREATE TYPE "public"."enum_why_us_points_icon" AS ENUM('megaphone', 'share-2', 'search', 'globe', 'map-pin', 'target', 'trending-up', 'users', 'lightbulb', 'rocket', 'bar-chart-3', 'heart-pulse', 'graduation-cap', 'building-2', 'shopping-cart', 'briefcase', 'store', 'star', 'award', 'zap', 'palette', 'camera', 'pen-tool', 'layout-grid', 'smartphone', 'monitor', 'compass', 'line-chart', 'handshake', 'shield-check', 'message-circle');
  CREATE TYPE "public"."enum_industries_items_icon" AS ENUM('megaphone', 'share-2', 'search', 'globe', 'map-pin', 'target', 'trending-up', 'users', 'lightbulb', 'rocket', 'bar-chart-3', 'heart-pulse', 'graduation-cap', 'building-2', 'shopping-cart', 'briefcase', 'store', 'star', 'award', 'zap', 'palette', 'camera', 'pen-tool', 'layout-grid', 'smartphone', 'monitor', 'compass', 'line-chart', 'handshake', 'shield-check', 'message-circle');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'youtube', 'twitter');
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'star' NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_services_provided" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"client_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"industry" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"summary" varchar NOT NULL,
  	"featured" boolean DEFAULT true,
  	"case_study" jsonb,
  	"case_study_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"client_name" varchar NOT NULL,
  	"business_name" varchar NOT NULL,
  	"avatar_id" integer,
  	"rating" numeric DEFAULT 5,
  	"quote" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"category" varchar DEFAULT 'Digital Marketing',
  	"read_time" varchar DEFAULT '5 min read',
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"business_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"website" varchar,
  	"service_required" varchar,
  	"monthly_budget" varchar,
  	"message" varchar,
  	"status" "enum_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"submissions_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'MITHORA' NOT NULL,
  	"cta_label" varchar DEFAULT 'Let''s Talk',
  	"cta_href" varchar DEFAULT '/#contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Digital Marketing & Advertising Agency',
  	"headline" varchar DEFAULT 'We Make Brands Grow.' NOT NULL,
  	"subheadline" varchar DEFAULT 'Mithora is a digital marketing & advertising agency helping businesses build stronger brands, reach the right audience and generate quality leads.' NOT NULL,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "what_we_do" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Everything Your Brand Needs to Grow Online.' NOT NULL,
  	"subheading" varchar DEFAULT 'From strategy to execution, we handle every digital channel that drives real business growth.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "why_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_why_us_points_icon" DEFAULT 'star' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "why_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'We Don''t Just Create Content. We Create Growth Systems.' NOT NULL,
  	"subheading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "process" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our Process' NOT NULL,
  	"subheading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "work_intro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Featured Work' NOT NULL,
  	"subheading" varchar DEFAULT 'A few of the brands we have helped grow.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "industries_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_industries_items_icon" DEFAULT 'star' NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Industries We Serve' NOT NULL,
  	"subheading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonials_intro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say' NOT NULL,
  	"subheading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "insights_intro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ideas. Trends. Digital Growth.' NOT NULL,
  	"subheading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready to Grow Your Brand?' NOT NULL,
  	"subheading" varchar DEFAULT 'Let''s turn your digital presence into a growth engine.',
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_service_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact_budget_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Let''s Talk About Your Business' NOT NULL,
  	"subheading" varchar DEFAULT 'Tell us a bit about your business and we will get back to you shortly.',
  	"email" varchar,
  	"phone" varchar,
  	"success_message" varchar DEFAULT 'Thanks! We''ve received your enquiry and will be in touch within 24 hours.',
  	"submit_label" varchar DEFAULT 'Send Enquiry',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_services_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Digital Growth. Real Results.',
  	"copyright_text" varchar DEFAULT 'MITHORA. All Rights Reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_title" varchar DEFAULT 'MITHORA — Digital Marketing & Advertising Agency' NOT NULL,
  	"site_description" varchar DEFAULT 'Mithora is a digital marketing & advertising agency helping businesses build stronger brands, reach the right audience and generate quality leads.' NOT NULL,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects_services_provided" ADD CONSTRAINT "projects_services_provided_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stats_items" ADD CONSTRAINT "stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "why_us_points" ADD CONSTRAINT "why_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."why_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_steps" ADD CONSTRAINT "process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_items" ADD CONSTRAINT "industries_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_service_options" ADD CONSTRAINT "contact_service_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_budget_options" ADD CONSTRAINT "contact_budget_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_quick_links" ADD CONSTRAINT "footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_services_links" ADD CONSTRAINT "footer_services_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "projects_services_provided_order_idx" ON "projects_services_provided" USING btree ("_order");
  CREATE INDEX "projects_services_provided_parent_id_idx" ON "projects_services_provided" USING btree ("_parent_id");
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "testimonials__order_idx" ON "testimonials" USING btree ("_order");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "posts__order_idx" ON "posts" USING btree ("_order");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "hero_background_image_idx" ON "hero" USING btree ("background_image_id");
  CREATE INDEX "stats_items_order_idx" ON "stats_items" USING btree ("_order");
  CREATE INDEX "stats_items_parent_id_idx" ON "stats_items" USING btree ("_parent_id");
  CREATE INDEX "why_us_points_order_idx" ON "why_us_points" USING btree ("_order");
  CREATE INDEX "why_us_points_parent_id_idx" ON "why_us_points" USING btree ("_parent_id");
  CREATE INDEX "process_steps_order_idx" ON "process_steps" USING btree ("_order");
  CREATE INDEX "process_steps_parent_id_idx" ON "process_steps" USING btree ("_parent_id");
  CREATE INDEX "industries_items_order_idx" ON "industries_items" USING btree ("_order");
  CREATE INDEX "industries_items_parent_id_idx" ON "industries_items" USING btree ("_parent_id");
  CREATE INDEX "contact_service_options_order_idx" ON "contact_service_options" USING btree ("_order");
  CREATE INDEX "contact_service_options_parent_id_idx" ON "contact_service_options" USING btree ("_parent_id");
  CREATE INDEX "contact_budget_options_order_idx" ON "contact_budget_options" USING btree ("_order");
  CREATE INDEX "contact_budget_options_parent_id_idx" ON "contact_budget_options" USING btree ("_parent_id");
  CREATE INDEX "footer_quick_links_order_idx" ON "footer_quick_links" USING btree ("_order");
  CREATE INDEX "footer_quick_links_parent_id_idx" ON "footer_quick_links" USING btree ("_parent_id");
  CREATE INDEX "footer_services_links_order_idx" ON "footer_services_links" USING btree ("_order");
  CREATE INDEX "footer_services_links_parent_id_idx" ON "footer_services_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services" CASCADE;
  DROP TABLE "projects_services_provided" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "stats_items" CASCADE;
  DROP TABLE "stats" CASCADE;
  DROP TABLE "what_we_do" CASCADE;
  DROP TABLE "why_us_points" CASCADE;
  DROP TABLE "why_us" CASCADE;
  DROP TABLE "process_steps" CASCADE;
  DROP TABLE "process" CASCADE;
  DROP TABLE "work_intro" CASCADE;
  DROP TABLE "industries_items" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "testimonials_intro" CASCADE;
  DROP TABLE "insights_intro" CASCADE;
  DROP TABLE "cta_section" CASCADE;
  DROP TABLE "contact_service_options" CASCADE;
  DROP TABLE "contact_budget_options" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "footer_quick_links" CASCADE;
  DROP TABLE "footer_services_links" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_submissions_status";
  DROP TYPE "public"."enum_why_us_points_icon";
  DROP TYPE "public"."enum_industries_items_icon";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
