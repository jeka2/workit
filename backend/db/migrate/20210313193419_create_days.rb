class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :weight
      t.integer :calories
      t.integer :protein
      t.integer :carbs
      t.integer :fat
      t.integer :water

      t.timestamps
    end
  end
end
