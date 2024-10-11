import { defineConfig,UserConfigExport,ConfigEnv,loadEnv } from 'vite'
import {viteMockServe} from "vite-plugin-mock"
import vue from '@vitejs/plugin-vue'
import path from "path"

export default (({command,mode}:ConfigEnv):UserConfigExport=>{
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled:command === "serve"
      })
    ],
    resolve:{
      alias:{
        "@":path.resolve("./src")
      }
    },
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_APP_SERVICE_URL,
          changeOrigin:true,
          rewrite:(path)=>path.replace(/^\/dev-api/,"")
        }
      }
    }
  }
})
