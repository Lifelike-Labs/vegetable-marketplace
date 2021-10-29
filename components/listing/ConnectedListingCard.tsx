import ListingCard from "../../components/listing/ListingCard";
import { KeyOptions, ListingAPIResource } from '../../lib/frontend/data/listing';
import connectToAPI from '../../components/hoc/connectToAPI';

type ComponentProps = React.ComponentProps<typeof ListingCard>
const ConnectedListing = connectToAPI<ComponentProps, KeyOptions>(ListingCard, ListingAPIResource)
export default ConnectedListing
