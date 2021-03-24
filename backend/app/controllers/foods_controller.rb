class FoodsController < ApplicationController
    require 'httparty'
    def index
        # day = Time.parse("#{params[:year]}-#{params[:month]}-#{params[:day]}")
        # render json: { user: User.where(created_at: day.midnight..day.end_of_day)}
    end

    def create 

    end

    def show
        binding.pry
    end

    def destroy

    end

    def searchbar
        results = searchbar_info(query: params[:query], size: 5)
        render json: { results: results }
    end

private 
    def full_item_info(name)
        HTTParty.post("https://trackapi.nutritionix.com/v2/natural/nutrients", headers: {"x-app-id": ENV['NUTRITIONIX_ID'], "x-app-key": ENV['NUTRITIONIX_KEY'], "x-remote-user-id": '0'}, body: { 'query': name })
    end

    def searchbar_info(query:, size:)
        HTTParty.get("https://trackapi.nutritionix.com/v2/search/instant?query=#{query}", headers: {"x-app-id": ENV['NUTRITIONIX_ID'], "x-app-key": ENV['NUTRITIONIX_KEY'], "x-remote-user-id": '0'})
    end
end
