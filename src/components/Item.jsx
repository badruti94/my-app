import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Button, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
import ItemList from "./ItemList"
import { itemModalAdd, toggle } from "../redux/itemModalSlice"
import { useEffect } from "react"
import { paginate, totalPage } from "../utils/pagination"
import { fetchItems } from "../utils"
import { setPage } from "../redux/itemsSlice"

const Item = () => {
  const dispatch = useDispatch()
  const filteredItems = useSelector((state) => state.items.filteredItems)
  const page = useSelector((state) => state.items.page)

  useEffect(() => {
    fetchItems(dispatch)
  }, [])

  const pageElement = () => {
    const element = []
    for (let i = 1; i <= totalPage(filteredItems, 4); i++) {
      element.push(
        <PaginationItem active={i === page} onClick={() => { dispatch(setPage(i)) }}>
          <PaginationLink href="#">
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return element
  }

  return (
    <React.Fragment>
      <Button color='success' className='mb-2'
        onClick={() => {
          dispatch(toggle())
          dispatch(itemModalAdd())
        }}>
        Add Item
      </Button>
      <Row className='row-cols-1 row-cols-md-3 g-4'>
        {filteredItems && paginate(filteredItems, 4, page).map(item => <ItemList item={item} />)}
      </Row>
      <Pagination className='mx-auto w-25 mt-4'>
        <PaginationItem
          onClick={() => { dispatch(setPage(1)) }}>
          <PaginationLink
            first
            href="#"
          />
        </PaginationItem>
        <PaginationItem
          onClick={() => {
            if (page !== 1) {
              dispatch(setPage(page - 1))
            }
          }} >
          <PaginationLink
            href="#"
            previous
          />
        </PaginationItem>
        {pageElement()}
        <PaginationItem
          onClick={() => {
            if (page !== totalPage(filteredItems, 4)) {
              dispatch(setPage(page + 1))
            }
          }} >
          <PaginationLink
            href="#"
            next
          />
        </PaginationItem>
        <PaginationItem
          onClick={() => { dispatch(setPage(totalPage(filteredItems, 4))) }}>
          <PaginationLink
            href="#"
            last
          />
        </PaginationItem>
      </Pagination>
    </React.Fragment>
  )
}

export default Item