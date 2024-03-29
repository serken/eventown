# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_10_092527) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer "user_id"
    t.string "message"
    t.integer "commentable_id"
    t.string "commentable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "image"
    t.string "phone"
    t.string "address"
    t.integer "user_id"
    t.string "facebook"
    t.string "twitter"
    t.string "instagram"
    t.boolean "active"
    t.string "remote_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.string "description", default: "", null: false
    t.integer "event_type", default: 0, null: false
    t.string "image", default: "null"
    t.float "cost", null: false
    t.string "remote_url", default: "", null: false
    t.string "location", default: "", null: false
    t.string "phone_number", default: "f", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.boolean "active", default: false, null: false
    t.date "start_date"
    t.time "start_time"
    t.string "duration"
    t.bigint "company_id"
    t.index ["company_id"], name: "index_events_on_company_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "favoritable_id"
    t.string "favoritable_type"
    t.integer "user_id"
    t.index ["favoritable_id"], name: "index_favorites_on_favoritable_id"
    t.index ["favoritable_type"], name: "index_favorites_on_favoritable_type"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "password", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.boolean "is_admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "restore_token"
    t.string "image"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
