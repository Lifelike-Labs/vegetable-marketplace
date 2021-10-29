import connectToAPI from '../../components/hoc/connectToAPI';
import ListingList from './ListingList';
import { ListingsAPIResource, KeyOptions } from '../../lib/frontend/data/listings';

type ComponentProps = React.ComponentProps<typeof ListingList>
const ConnectedListingList = connectToAPI<ComponentProps, KeyOptions >(ListingList, ListingsAPIResource)
export default ConnectedListingList
