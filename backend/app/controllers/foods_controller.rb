class FoodsController < ApplicationController
    require 'httparty'
    def index
        day = Time.parse("#{params[:year]}-#{params[:month]}-#{params[:day]}")

        foods = Food.where(created_at: day.midnight..day.end_of_day)

        if foods.empty?
            render json: { foods: foods }
        else    
            render json: { foods: Food.where(created_at: day.midnight..day.end_of_day)}
        end
    end

    def create   
        day = day_param
        food = Food.new(food_params)

        food.day = day

        if food.save
            render json: { message: "#{food.name} has been added!", type: 'success' }
        else
            render json: { message: "Something went wrong!", type: 'error' }
        end
    end

    def show
        name = params[:id].split('_').join(' ')
        results = full_item_info(name)
        render json: { results: results }
    end

    def update 
        food = Food.find(params[:id])

        if food && food.update(food_params)
            render json: { message: "#{food.name} Updated Successfully", type: 'success' }
        else
            render json: { message: "#{food.name} Could Not Be Updated", type: 'error' }
        end
    end

    def destroy
        food = Food.find(params[:id])
        if food 
            food_name = food.name
            if food.delete
                render json: { message: "#{food_name} succesfully removed", type: 'success' } 
            else
                render json: { message: "#{food_name} could not be deleted", type: 'error' }
            end
        else
            render json: { message: "Something was wrong with your request", type: 'error' }
        end
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

    def food_params
        binding.pry
        json_params = ActionController::Parameters.new(JSON.parse(params[:data]))
        json_params.require(:foods).permit(:name, :calories, :protein, :cholesterol, :sodium, :sugar, :carbs, :fat, :serv_qty, :serv_unit, :photo, :thumb, :id)
    end

    def day_param
        day_param = Date.parse(JSON.parse(params[:data])['day'])
        
        day = Day.where(created_at: day_param.midnight..day_param.end_of_day).first
        day = Day.create(user: User.first) unless day
        day
    end

end
