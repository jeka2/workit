class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.references :day, null: false, foreign_key: true
      t.string :name
      t.numeric :serv_qty
      t.string :serv_unit
      t.numeric :protein
      t.numeric :fat
      t.numeric :sodium
      t.numeric :carbs
      t.numeric :calories
      t.numeric :cholesterol
      t.numeric :sugar
      t.string :photo
      t.string :thumb

      t.timestamps
    end
  end
end
