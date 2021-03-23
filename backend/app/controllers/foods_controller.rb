class FoodsController < ApplicationController
    def index
        day = Time.parse("#{params[:year]}-#{params[:month]}-#{params[:day]}")
        render json: { user: User.where(created_at: day.midnight..day.end_of_day)}
    end

    def create 

    end

    def show

    end

    def destroy

    end

    def searchbar

    end

private 
    def searchbar_info(query:, size:)
        
    end
end
