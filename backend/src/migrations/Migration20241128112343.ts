import { Migration } from '@mikro-orm/migrations';

export class Migration20241128112343 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" uuid not null default gen_random_uuid(), "first_name" varchar(255) null, "last_name" varchar(255) null, "is_admin" boolean not null default false, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("uuid"));');

    this.addSql('create table "refresh_token_meta" ("uuid" uuid not null, "device_name" varchar(255) not null, "device_ip" varchar(255) not null, "refresh_token" varchar(255) not null, "expires_at" timestamptz(0) not null, "user_uuid" uuid not null, constraint "refresh_token_meta_pkey" primary key ("uuid"));');

    this.addSql('alter table "refresh_token_meta" add constraint "refresh_token_meta_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "refresh_token_meta" drop constraint "refresh_token_meta_user_uuid_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "refresh_token_meta" cascade;');
  }

}
