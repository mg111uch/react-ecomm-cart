import axios from "axios";

var PRODUCTS = []
  
export async function getProducts(cat,subcat) { 
    const filterData = {
        cat: cat,
        subCat: subcat
      }
      await axios
          .post("http://localhost:5000/filterList", 
                  JSON.stringify(filterData), 
                  {headers: {'Content-Type': 'application/json'}})
          .then(res => PRODUCTS = res.data)
    console.log(PRODUCTS)
    return PRODUCTS;
} 
 
export function getProduct(id) {
    return PRODUCTS.find((product) => (product.data.id === id));
}