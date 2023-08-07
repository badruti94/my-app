import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from "../redux/itemModalSlice";
import { API, getConfig } from "../config/api";
import { setFormData } from "../redux/formDataSlice";
import { fetchItems } from "../utils"
import { SwalFire, SwalLoading } from "../utils/Swal";

const AddItemModal = () => {
  const items = useSelector((state) => state.items.value)
  const itemModal = useSelector((state) => state.itemModal.value)
  const isEdit = useSelector((state) => state.itemModal.edit)
  const id = useSelector((state) => state.itemModal.id)
  const formData = useSelector((state) => state.formData.value)
  const [imageFile, setImageFile] = useState('')
  const dispatch = useDispatch()

  const handleChange = async e => {
    dispatch(setFormData({
      ...formData,
      [e.target.name]: e.target.type !== 'file' ? e.target.value : ''
    }))

    if (e.target.type === 'file') {
      const file = e.target.files[0]
      setImageFile(e.target.files)
      dispatch(setFormData({
        ...formData,
        imgUrl: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const isUnique = () => {
      const itemsUniqueFiltered = items.filter(item => item.name === formData.name)
      if (itemsUniqueFiltered.length > 0) {
        return false
      } else {
        return true
      }
    }
    if (!isUnique()) {
      SwalFire('error', 'Nama Barang harus unik')
      return
    }
    if (imageFile !== "" && imageFile[0].size > 100 * 1000) {
      SwalFire('error', 'Ukuran maksimal gambar 100KB')
      return
    }

    const swalLoading = SwalLoading()
    try {

      const submitData = new FormData()
      submitData.set('name', formData.name)
      submitData.set('stock', formData.stock)
      submitData.set('buyPrice', formData.buyPrice)
      submitData.set('sellPrice', formData.sellPrice)
      if (imageFile !== "") {
        submitData.set('image', imageFile[0], imageFile[0].name)
      }

      const config = await getConfig()
      if (!isEdit) {
        await API.post('/items', submitData, config)
      } else {
        await API.put(`/items/${id}`, submitData, config)
      }
      swalLoading.close()
      dispatch(toggle())
      fetchItems(dispatch)
      const text = !isEdit ? 'Barang berhasil ditambahkan' : 'Barang berhasil diupdate'
      SwalFire('success', text)
    } catch (error) {
      swalLoading.close()
      console.log(error);
    }
  }

  return (
    <Modal isOpen={itemModal} toggle={() => dispatch(toggle())} >
      <ModalHeader toggle={() => dispatch(toggle())}>Add Item</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">
              Nama Barang
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Nama Barang"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="stock">
              Stok
            </Label>
            <Input
              id="stock"
              name="stock"
              placeholder="Stok Barang"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="buyPrice">
              Harga Beli
            </Label>
            <Input
              id="buyPrice"
              name="buyPrice"
              placeholder="Harga Beli"
              type="number"
              value={formData.buyPrice}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="sellPrice">
              Harga Jual
            </Label>
            <Input
              id="sellPrice"
              name="sellPrice"
              placeholder="Harga Jual"
              type="number"
              value={formData.sellPrice}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">
              Gambar
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleChange}
              accept=".png,.jpg"
            />
            <img
              className='mt-2'
              src={formData.imgUrl}
              alt="img-preview"
              width={'50%'}
            />
          </FormGroup>
          <Button color='success' type="submit">
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddItemModal