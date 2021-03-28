class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|

      t.timestamps
    end
  end
end
