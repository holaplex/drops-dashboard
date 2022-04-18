Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    if Rails.env.development?
      origins 'localhost:3000', 'localhost:3001', 'localhost:5000'
    else
      origins 'https://my-app.com'
    end

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
