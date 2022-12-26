import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandNav from './components/BrandNav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [sorted, setSorted] = useState();
  const [unsorted,setUnsorted] = useState();
  const [searchWord, setWord] = useState("");
  const [categories, setCategories] = useState([]);
  const [choosen, setChoosenCategory] = useState("");
  const [sort, setSort] = useState(false);

  //Load API on Component Mound
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
      setProducts(json)
      setUnsorted(json)
      var temp=[...json,]
      setSorted(temp.sort((ob1,ob2) => (ob1.title>ob2.title? 1: -1)))
    })
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>setCategories(json))
  }, [])

  useEffect(() => {
    if(sort)
    {
      setProducts(sorted)
    }
    else{
      setProducts(unsorted)
    }
  }, [sort])

  return (
    <div className='bg-light'>
      <BrandNav />
      <div className='container'>
        <div className='row'>
            <div className='col-lg-8 my-4'>
              <div className='input-group bg-body rounded border'>
                    <input className='form-control form-control-lg border-0' type="text" 
                        onChange={(e) => setWord(e.target.value.toLowerCase())}/>
                    <span class="input-group-text bg-body border-0" id="basic-addon2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                    </span>
                </div>
            </div>
            <div className='col my-4'>
              <DropdownButton
                      size="lg"
                      variant="outline-secondary"
                      title={choosen?choosen:"Filter"}
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item href="#"  onClick={() => setChoosenCategory("")}>All</Dropdown.Item>
                    {
                        categories?.map((category,index) => 
                        <Dropdown.Item href="#" key={index}  onClick={() => setChoosenCategory(category)}>{category}</Dropdown.Item>
                        )
                      }
                </DropdownButton>
            </div>
            <div className='col my-4'>
              <div class="form-check form-switch fs-4">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={sort} onClick={() => setSort(!sort)}/>
                <label class="form-check-label" for="flexSwitchCheckDefault">Sort</label>
              </div>
            </div>
        </div>
        <div className="row">
          {
            products?.map((product,index) => 
            product?.title?.split(' ').slice(0, 4).join(' ').toLowerCase().includes(searchWord) && (product?.category === choosen || choosen == "")?
            <div className='col d-flex justify-content-center'>
              <div class="card my-2 p-5 border-light shadow" style={{width: "260px", borderRadius: 25+"px"}}>
                <div className='d-flex justify-content-center' style={{width: "220px", height: "250px"}}>
                <img src={product.image} width="100%" className="card-img-top" alt="Image loading..."/>
                </div>
                <div class="card-body bg-white">
                  <h5 className="card-title m-auto">{product.title.split(' ').slice(0, 4).join(' ')}</h5>
                  <h6 class="card-subtitle mb-2 text-muted my-2">{product.price}
                    <div className='star-rating d-flex float-end'>
                      <span class={Math.round(product.rating.rate)>0?"fa fa-star checked":"fa fa-star"}></span>
                      <span class={Math.round(product.rating.rate)>1?"fa fa-star checked":"fa fa-star"}></span>
                      <span class={Math.round(product.rating.rate)>2?"fa fa-star checked":"fa fa-star"}></span>
                      <span class={Math.round(product.rating.rate)>3?"fa fa-star checked":"fa fa-star"}></span>
                      <span class={Math.round(product.rating.rate)>4?"fa fa-star checked":"fa fa-star"}></span>
                    </div>
                  </h6>
                  {/* <p class="card-text">{product.description}.</p> */}
                  <a href="#" class="btn btn-primary d-flex justify-content-center mt-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    Add to cart
                  </a>
                </div>
                {/* <div class="card-footer">
                  2 days ago
                </div> */}
              </div>
            </div>
            :""
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
