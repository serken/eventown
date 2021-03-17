# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

80.times do |i|
  e = Event.new
  e.title = Faker::Esport.event
  e.description = Faker::Lorem.paragraphs
  e.image = Faker::LoremFlickr.image
  e.cost = Faker::Commerce.price
  e.remote_url = Faker::Internet.url
  e.start_date = Faker::Date.in_date_period(month: 2)
  e.location = Faker::Address.city
  e.phone_number = "#{Faker::PhoneNumber.cell_phone}"
  e.event_type = Random.rand(4)
  e.save
end
