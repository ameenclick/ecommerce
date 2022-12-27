import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect,useRef } from 'react';

export default function Cart(props) {
    const total = useRef({});
    useEffect(() => {
    total.current=0
         for(var i=0;i<props?.products?.length;i++)
            {
                total.current=total.current+props.products[i].price
            }
    }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Products</h4>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        S No.
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Price
                    </th>
                </tr>
            </thead>
        <tbody>
        {
            props.products?.map((product,index) => 
            <tr><td>{index+1}</td><td>{product.title}</td><td>{product.description}</td><td className='bold'>${product.price}</td></tr> ,
            )
        }
        </tbody>
        </table>
        <hr class="dropdown-divider"/>
        <div className='row'>
            <div style={{marginLeft: "70%"}} className='float-end'>
                <b>Total Price: ${total.current}</b>
            </div>
        </div>
        <footer className=''>The Cart is incomplete due to time constrain</footer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Buy Now</Button>
      </Modal.Footer>
    </Modal>
  )
}
