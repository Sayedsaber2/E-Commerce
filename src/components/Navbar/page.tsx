
import { getServerSession } from "next-auth";
import NavbarClient from "./NavbarClient";
import { authoptions } from "@/auth";
import { CartRse } from "@/interfaces/Cartinterface";


export default async function Navbar() {

  const session = await getServerSession(authoptions)
  let data :CartRse|null= null
  
    if(session) {

      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: session?.token as string
        }
      })
      data = await response.json()
    }  

  return (
    <>
      <NavbarClient serverCartNum={data?.numOfCartItems}  />
    </>
  )
}
