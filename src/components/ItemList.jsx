import { useDispatch, useSelector } from "react-redux"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col } from "reactstrap"
import { itemModalEdit, toggle } from "../redux/itemModalSlice"
import { setFormData } from "../redux/formDataSlice"
import { API, getConfig } from "../config/api"
import { fetchItems } from "../utils"
import { SwalConfirm, SwalLoading } from "../utils/Swal"


const ItemList = ({ item }) => {
  const items = useSelector((state) => state.items.value)
  const dispatch = useDispatch()
  const { id, name, stock, buyPrice, sellPrice, image } = item

  const handleEdit = () => {
    dispatch(toggle())
    const item = items.filter(item => item.id === id)[0]
    dispatch(itemModalEdit(id))
    dispatch(setFormData({ ...item, image: '', imgUrl: item.image }))
  }

  const handleDelete = async () => {
    const deleteItem = async () => {
      const swalLoading = SwalLoading()
      try {
        const config = await getConfig()
        await API.delete(`/items/${id}`, config)
        fetchItems(dispatch)
      } catch (error) {
        swalLoading.close()
        console.log(error);
      }
    }
    SwalConfirm(deleteItem, 'Barang berhasil dihapus')
  }

  return (
    <Col>
      <Card className='me-5'>
        <CardImg
          alt="Card image cap"
          src={image}
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            {name}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Stok: {stock}
          </CardSubtitle>
          <CardText>
            Harga Beli : Rp. {buyPrice} <br />
            Harga jual : Rp. {sellPrice}
          </CardText>
          <Button
            color="primary"
            className="me-2"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            color="danger"
            className="me-2"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ItemList