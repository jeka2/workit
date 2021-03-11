class User < ApplicationRecord
    has_secure_password
    validates :username, length: { minimum: 5, maximum: 30 },
        uniqueness: true
    
    validates :password, 
    format: { with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}\z/,
              message: "must be at least 8 characters long, contain at least one uppercase letter, one lowecase letter, one number and one special character" },
              presence: true, confirmation: true
    
    validates :age, :numericality => { only_integer: true, greater_than: 0 }
end
