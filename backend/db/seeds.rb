# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

User.create(
  username: 'dan', 
  email: 'dan@holaplex.com', 
  password: '123456', user_type: 'admin')