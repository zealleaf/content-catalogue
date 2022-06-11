import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  'leafvein-catalogue': r('./packages/catalogue/src/index.ts')
}
