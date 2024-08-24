import dotenv from 'dotenv'
dotenv.config()

export const PORT= process.env.PORT
export const JWT_KEY=process.env.JWT_KEY
export const ORIGIN=process.env.ORIGIN
export const DATABASE_URL=process.env.DATABASE_URL
