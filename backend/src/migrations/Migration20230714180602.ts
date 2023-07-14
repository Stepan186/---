import { Migration } from '@mikro-orm/migrations';

export class Migration20230714180602 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "room" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "price" numeric(10,0) not null);');

    this.addSql('create table "user" ("uuid" uuid not null default gen_random_uuid(), "first_name" varchar(255) null, "last_name" varchar(255) null, "is_admin" boolean not null default false, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "is_vip" boolean not null default false, constraint "user_pkey" primary key ("uuid"));');

    this.addSql('create table "refresh_token_meta" ("uuid" uuid not null, "device_name" varchar(255) not null, "device_ip" varchar(255) not null, "refresh_token" varchar(255) not null, "expires_at" timestamptz(0) not null, "user_uuid" uuid not null, constraint "refresh_token_meta_pkey" primary key ("uuid"));');

    this.addSql('create table "booking" ("uuid" uuid not null default gen_random_uuid(), "user_uuid" uuid not null, "room_id" int not null, "check_in" timestamptz(0) not null, "check_out" timestamptz(0) not null, "expired_at" timestamptz(0) not null, "is_vip" boolean null default false, constraint "booking_pkey" primary key ("uuid"));');

    this.addSql('alter table "refresh_token_meta" add constraint "refresh_token_meta_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade on delete cascade;');

    this.addSql('alter table "booking" add constraint "booking_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');
    this.addSql('alter table "booking" add constraint "booking_room_id_foreign" foreign key ("room_id") references "room" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "booking" drop constraint "booking_room_id_foreign";');

    this.addSql('alter table "refresh_token_meta" drop constraint "refresh_token_meta_user_uuid_foreign";');

    this.addSql('alter table "booking" drop constraint "booking_user_uuid_foreign";');

    this.addSql('drop table if exists "room" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "refresh_token_meta" cascade;');

    this.addSql('drop table if exists "booking" cascade;');
  }

}
