export const isProd = () => import.meta.env.MODE === 'production' || process.env.NODE_ENV === 'production'

export const isDev = () => !isProd()
