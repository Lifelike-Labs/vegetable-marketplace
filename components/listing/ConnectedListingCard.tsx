import ListingCard from "../../components/listing/ListingCard";
import { ListingAPIResource } from '../../lib/frontend/data/listing';
import connectToAPI from '../../components/hoc/connectToAPI';

const ConnectedListing = () => {
    const ConnectedListingCard = connectToAPI(ListingCard, ListingAPIResource)
    return <ConnectedListingCard/>
}

export default ConnectedListing
