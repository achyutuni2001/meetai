import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  socialProviders: {
    github: true,
    google: true,
  },
  emailAndPassword: {
    enabled: true
  }
})