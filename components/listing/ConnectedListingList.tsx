import connectToAPI from '../../components/hoc/connectToAPI';
import ListingList from './ListingList';
import { ListingsAPIResource } from '../../lib/frontend/data/listings';

const ConnectedListingList = connectToAPI(ListingList, ListingsAPIResource)
export default ConnectedListingList
