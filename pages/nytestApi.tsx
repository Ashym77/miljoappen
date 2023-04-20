import { log } from "console"
import { NextPage } from "next"
import styles from "../styles/testApi.module.css"
import Image from "next/image"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Props {}

interface Product {
  code: string

  product_name: string

  brands: string

  categories: string

  image_url: string

  ecoscore_grade: string

  ecoScoreImage: string

  ecoScoreLable: string
}

const ecoScoreImage = [
  "/ecoscore_a.svg",
  "/ecoscore_b.svg",
  "/ecoscore_c.svg",
  "/ecoscore_d.svg",
  "/ecoscore_e.svg",
  "/ecoscore_u_v2.svg",
]

function getEcoScoreImage(score: string): string {
  switch (score) {
    case "a":
      return ecoScoreImage[0]
    case "b":
      return ecoScoreImage[1]
    case "c":
      return ecoScoreImage[2]
    case "d":
      return ecoScoreImage[3]
    case "e":
      return ecoScoreImage[4]
    // case "unknown":
    //   return ecoScoreImage[5]
    default:
      return ecoScoreImage[5]
  }
}

const ecoScoreLable = [
  "Låg klimatpåverkan",
  "Låg klimatpåverkan",
  "Måttlig klimatpåverkan",
  "Hög klimatpåverkan",
  "Hög klimatpåverkan",
  "Odefinierat",
]

function getEcoScoreLable(lable: string): string {
  switch (lable) {
    case "a":
      return ecoScoreLable[0]
    case "b":
      return ecoScoreLable[1]
    case "c":
      return ecoScoreLable[2]
    case "d":
      return ecoScoreLable[3]
    case "e":
      return ecoScoreLable[4]
    default:
      return ecoScoreLable[5]
  }
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        // "https://world.openfoodfacts.org/cgi/search.pl?action=process&sort_by=unique_scans_n&page_size=100&json=true"
        //https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&tagtype_1=brands&tag_contains_1=contains&tag_1=Arla&sort_by=unique_scans_n&page_size=300&json=true"
        // "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&sort_by=unique_scans_n&page_size=290&json=true"
        //"https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&json=true"
        // "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&sort_by=unique_scans_n&page_size=1000&json=true"
        //"https://sv.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&json=true&lc=sv&page_size=100"
     // https://sv.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=manufacturinghttps://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&sort_by=unique_scans_n&page_size=300&json=true_places&tag_contains_0=contains&tag_0=Sweden&tagtype_1=brands&tag_contains_1=contains&tag_1=Arla+Foods%2C+Felix&sort_by=unique_scans_n&page_size=20&json=true"
         "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=countries&tag_contains_0=contains&tag_0=Sweden&sort_by=unique_scans_n&page_size=310&json=true"
     
     
     
     )

      const data = await response.json()

      const products: Product[] = data.products.map((product: Product) => ({
        code: product.code,

        product_name: product.product_name,

        brands: product.brands,

        categories: product.categories,

        image_url: product.image_url,

        ecoscore_grade: product.ecoscore_grade,

        ecoScoreImage: getEcoScoreImage(product.ecoscore_grade),

        ecoScoreLable: getEcoScoreLable(product.ecoscore_grade),
      }))

      setProducts(products)

      setFilteredProducts(products)
    }

    fetchProducts()
  }, [])

  // function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
  //   const searchTerm = event.target.value.toString()
  //   // console.log(products)
  //   // console.log(searchTerm)
  //   // setFilteredProducts([])
  //   const myFiltredProducts = products.forEach((product: Product) => {
  //     console.log(product)
  //     if (product.product_name === undefined) {
  //       console.log("undefiend product")
  //     } else {
  //       console.log("product was found :)")

  //       const hasLetter = product.product_name.includes(searchTerm)
  //       if (hasLetter) {
  //         setFilteredProducts([...filteredProducts, product])
  //       }
  //     }
  //   })

  //   console.log(myFiltredProducts)
  //   console.log("finished")
  // }
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase()
    //const firstLetter = event.target.value.trim().charAt(0).toLowerCase();

    const newFilteredProducts = products.filter((product) => {
      const productName = product.product_name?.toLowerCase()
      return productName?.includes(searchTerm)
      //return productName?.charAt(0) === firstLetter;
    })

    setFilteredProducts(newFilteredProducts)
  }

  // TODO

  return (
    <div>
      <div className={styles.searchbarContainer}>
        {/* <h1>Product List</h1> */}
        <input
          type="search"
          className={styles.input}
          placeholder="Sök produkt..."
          onChange={(event) => {
            handleSearch(event)
          }}
        />
      </div>
      <div className={styles.productContainer}>
        {filteredProducts.map((product) => (
          <div className={styles.productCard} key={product.code}>
            <div className={styles.imageContainer}>
              <img
                src={product.image_url}
                alt={product.product_name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfoContainer}>
              {/* <div className={styles.productNameContainer}> */}
              <h3 className={styles.productName}>{product.product_name}</h3>
              {/* </div> */}
              {/* <p className={styles.productBrand}>{product.brands}</p> */}
              {/* <p className={styles.productEcoScore}>
                EcoScore: {product.ecoscore_grade}
              </p> */}
              <div className={styles.ecoScoreContainer}>
                <p>Miljöpoäng: </p>
                <img
                  src={product.ecoScoreImage}
                  alt={`EcoScore: ${product.ecoscore_grade}`}
                  className={styles.ecoscoreImage}
                />
              </div>
              <p>{product.ecoScoreLable}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>
                  Visa produkt
                  <Link href="/" className={styles.buttonlink}></Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NyTestApi: NextPage<Props> = ({}) => {
  return <ProductList />
}

export default NyTestApi
