import Layout from '../components/Layout'
import AddItemModal from '../components/AddItemModal';
import SearchItem from '../components/SearchItem';
import Item from '../components/Item'
import { Container } from 'reactstrap';

const ItemPage = () => {

  return (
    <Layout>
      <Container className='mt-5'>
        <AddItemModal />
        <SearchItem />
        <Item />
      </Container>
    </Layout>
  )
}

export default ItemPage