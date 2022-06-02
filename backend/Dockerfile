FROM ruby:2.7.5

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client nodejs ffmpeg

COPY Gemfile ./
RUN bundle install

WORKDIR /backend
COPY . .

EXPOSE 3000

# COPY ./entrypoint.sh /
RUN chmod +x /backend/entrypoint.sh

ENTRYPOINT ["/backend/entrypoint.sh"]