class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.references :day, null: false, foreign_key: true
      t.string :name
      t.numeric :servings
      t.numeric :protein
      t.numeric :fat
      t.numeric :carbs
      t.numeric :calories

      t.timestamps
    end
  end
end
