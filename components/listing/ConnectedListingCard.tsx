import ListingCard from "../../components/listing/ListingCard";
import { KeyOptions, ListingAPIResource } from '../../lib/frontend/data/listing';
import connectToAPI from '../../components/hoc/connectToAPI';

const ConnectedListing = connectToAPI<KeyOptions>(ListingCard, ListingAPIResource)
export default ConnectedListing
