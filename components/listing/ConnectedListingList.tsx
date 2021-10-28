import connectToAPI from '../../components/hoc/connectToAPI';
import { ListingsAPIResource } from '../../lib/frontend/data/listing';
import ListingList from './ListingList';

const ConnectedListingList = () => {
    const ConnectedComponent = connectToAPI(ListingList, ListingsAPIResource)
    return <ConnectedComponent/>
}

export default ConnectedListingList
