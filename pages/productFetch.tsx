import MyContextProvider from "@/context/my-context-provider"
import FetchApi from "@/p-components/FetchApi"
import { NextPage } from "next"

interface Props {}

const ProductFetch: NextPage<Props> = ({}) => {
  return (
    <div>
      <FetchApi />
    </div>
  )
}

export default ProductFetch
