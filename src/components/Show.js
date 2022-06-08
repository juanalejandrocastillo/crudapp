import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)

const Show = () => {

     //1 configuramos hooks
    const [products, setProducts] = useState( [] )

    //2 referencia DB firestore
    const productsCollection = collection(db,"products")

    //3 mostrar los Docs
    const getProducts = async () => {
      const data = await getDocs(productsCollection)
      // console.log(data.docs)
      setProducts(
        data.docs.map( (doc) =>( {...doc.data(),id:doc.id}))
      )
      console.log(products)
    }

    //4 eliminar Doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    getProducts()
    }
    //5 confirmacion SWal2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Remove the product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
    //6 useEffect
    useEffect( () => {
      getProducts()
    }, [] )
    //7 Vista del Compnente
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2 '>
            <Link to="/create" className='btn btn-primary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark'>
                <thead >
                  <tr>
                    <th className='text-center'>Description</th>
                    <th className='text-center'>Stock</th>
                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {products.map( (product) => (
                    <tr key={product.id}>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className='btn btn-success'><i class="fa-solid fa-pen"></i></Link>
                        <button onClick={() => { confirmDelete(product.id) } } className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>
    </>
  )
}

export default Show