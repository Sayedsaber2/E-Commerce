import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //(https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"ecommerce.routemisr.com",
      pathname:"/Route-Academy-*/**"
    }]
  },
  
};
export default nextConfig;
