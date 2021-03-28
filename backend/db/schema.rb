# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_28_163403) do

  create_table "days", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "weight"
    t.decimal "bmr"
    t.decimal "activity_level"
    t.decimal "weekly_goal"
    t.integer "calories"
    t.integer "protein"
    t.integer "carbs"
    t.integer "fat"
    t.integer "water"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_days_on_user_id"
  end

  create_table "foods", force: :cascade do |t|
    t.integer "day_id", null: false
    t.string "name"
    t.decimal "serv_qty"
    t.string "serv_unit"
    t.decimal "protein"
    t.decimal "fat"
    t.decimal "sodium"
    t.decimal "carbs"
    t.decimal "calories"
    t.decimal "cholesterol"
    t.decimal "sugar"
    t.string "photo"
    t.string "thumb"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_id"], name: "index_foods_on_day_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "gender"
    t.integer "age"
    t.integer "height"
    t.decimal "weight_goal"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "days", "users"
  add_foreign_key "foods", "days"
end
