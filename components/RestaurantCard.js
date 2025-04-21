import { cdn_link } from ".././src/utils/constants"
import { FaStar, } from 'react-icons/fa'

const RestaurantCard = (props) =>{
    console.log('hiiiii')
    return (
        <div className="res-card">
            <img src={cdn_link + props.resdata.info.cloudinaryImageId} alt="food" className="res-image" />
            <div className="res-content">
                <h3 className="res-title">{props.resdata.info.name}</h3>
                <h4 className="res-cusins">{props.resdata.info.cuisines.join(", ")}</h4>
            </div>
            <h4 className="res-rating">{props.resdata.info.avgRating} <FaStar color="#FBBF24" size={10} /></h4>
        </div>
    )
}

export default RestaurantCard