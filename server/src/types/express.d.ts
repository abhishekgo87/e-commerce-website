declare global {
  namespace Express {
    interface Request {
      auth?: {
        accessToken: string
        userId: string
      }
    }
  }
}

export {}
