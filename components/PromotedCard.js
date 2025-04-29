import RestaurantCard from "./RestaurantCard"
const PromototedCard = (RestaurantCard) =>{

    return (props) =>{
        return (
            <div>
                <label className="LabelPromoted"> Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default PromototedCard