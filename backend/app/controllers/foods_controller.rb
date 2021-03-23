class FoodsController < ApplicationController
    require 'httparty'
    def index
        # day = Time.parse("#{params[:year]}-#{params[:month]}-#{params[:day]}")
        # render json: { user: User.where(created_at: day.midnight..day.end_of_day)}
    end

    def create 

    end

    def show

    end

    def destroy

    end

    def searchbar
        results = searchbar_info(query: 'chicken', size: 5)
        render json: { results: results }
    end

private 
    def searchbar_info(query:, size:)
        HTTParty.get("https://trackapi.nutritionix.com/v2/search/instant?query=#{query}", headers: {"x-app-id": ENV['NUTRITIONIX_ID'], "x-app-key": ENV['NUTRITIONIX_KEY'], "x-remote-user-id": '0'})
    end
end
