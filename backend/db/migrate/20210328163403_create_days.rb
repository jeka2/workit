class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.references :user, null: false, foreign_key: true
      t.numeric :weight
      t.numeric :bmr
      t.numeric :activity_level
      t.numeric :weekly_goal
      t.integer :calories
      t.integer :protein
      t.integer :carbs
      t.integer :fat
      t.integer :water

      t.timestamps
    end
  end
end

