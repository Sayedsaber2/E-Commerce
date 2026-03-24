import { UserInterface } from "@/interfaces/Authinterface"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserInterface
    token: string
  }
  interface User {
    userRes: UserInterface
    tokenRes: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    userRes: UserInterface
    tokenRes: string
  }
}