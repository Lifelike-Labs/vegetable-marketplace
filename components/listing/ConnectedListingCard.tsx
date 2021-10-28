import ListingCard from "../../components/listing/ListingCard";
import { ListingByIdAPIResource } from '../../lib/frontend/data/listing';
import connectToAPI from '../../components/hoc/connectToAPI';

const ConnectedListing = () => {
    const ConnectedListingCard = connectToAPI(ListingCard, ListingByIdAPIResource)
    return <ConnectedListingCard/>
}

export default ConnectedListing
