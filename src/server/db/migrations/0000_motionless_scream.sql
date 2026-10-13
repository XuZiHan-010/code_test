CREATE TYPE "public"."attempt_status" AS ENUM('in_progress', 'submitted', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."scope_type" AS ENUM('chapter', 'notebook');--> statement-breakpoint
CREATE TYPE "public"."verdict" AS ENUM('correct', 'incorrect', 'unanswered', 'pending');--> statement-breakpoint
CREATE TABLE "attempt_answers" (
	"attempt_id" uuid NOT NULL,
	"question_id" text NOT NULL,
	"response" jsonb,
	"verdict" "verdict",
	"feedback" text,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL,
	"graded_at" timestamp with time zone,
	"grading_tries" integer DEFAULT 0 NOT NULL,
	"next_retry_at" timestamp with time zone,
	CONSTRAINT "attempt_answers_attempt_id_question_id_pk" PRIMARY KEY("attempt_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"scope_type" "scope_type" NOT NULL,
	"chapter_id" text,
	"status" "attempt_status" DEFAULT 'in_progress' NOT NULL,
	"question_ids" text[] NOT NULL,
	"last_question_id" text,
	"total_count" integer NOT NULL,
	"correct_count" integer,
	"pending_count" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"submitted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "notebook_items" (
	"user_id" uuid NOT NULL,
	"question_id" text NOT NULL,
	"added_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notebook_items_user_id_question_id_pk" PRIMARY KEY("user_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "question_stats" (
	"user_id" uuid NOT NULL,
	"question_id" text NOT NULL,
	"wrong_count" integer DEFAULT 0 NOT NULL,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"last_verdict" "verdict" NOT NULL,
	"last_answered_at" timestamp with time zone NOT NULL,
	CONSTRAINT "question_stats_user_id_question_id_pk" PRIMARY KEY("user_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"username_normalized" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_normalized_unique" UNIQUE("username_normalized")
);
--> statement-breakpoint
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notebook_items" ADD CONSTRAINT "notebook_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_stats" ADD CONSTRAINT "question_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attempt_answers_pending" ON "attempt_answers" USING btree ("next_retry_at") WHERE "attempt_answers"."verdict" = 'pending';--> statement-breakpoint
CREATE UNIQUE INDEX "attempts_one_in_progress" ON "attempts" USING btree ("user_id","scope_type",coalesce("chapter_id", '')) WHERE "attempts"."status" = 'in_progress';--> statement-breakpoint
CREATE INDEX "attempts_user_chapter_submitted" ON "attempts" USING btree ("user_id","chapter_id","submitted_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "attempts_user_submitted" ON "attempts" USING btree ("user_id","submitted_at");