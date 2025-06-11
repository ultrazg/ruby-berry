import { Env } from 'wailsjs/go/main/App'

export const GetEnv = async () => {
  return await Env()
}
