const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|jpg|jpeg|png|ico|svg)(\?.*)?$/i
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  lintOnSave: false, // 设置eslint 报错时停止编译
  productionSourceMap: false, // 生产环境不需要source map 加速构建

  css:{
    loaderOptions:{
      scss:{
        prependData:`@import "@/assets/styles/variables.scss";`
      }
    }
  },

  devServer: {
    open: true, // npm run serve后自动打开页面
    host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
    port: 8000, // 开发服务器运行端口号
    proxy: {
      '/api': {
        target: 'http://59.110.156.56', // 代理接口地址
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
        }
      }
    },
    before(app){
      let id = 1;
      let store = [{
        id:id++,
        name:'zhaozhenguo',
        password:'zhaozhenguo',
        age:30,
        token:id+'_'+Date.now()
      }]
      app.get('/launch',(req,res)=>{
        let flag = false;
        if(req.headers.token){
          flag = store.some((item)=>{
            if(item.token === req.headers.token){
              res.status(200).json({
                error:0,
                data:item
              });
              return true;
            }
            return false;
          })
        }else{
          res.status(200,'未登录');
        }
      })
      app.get('/getData',(req,res)=>{
        res.json({
          error:0,
          data:{
            name:'赵振国',
          }
        })
      })
      app.post('/login',(req,res)=>{
        let data='';
        req.on('data',(chunk)=>{
          data+=chunk;
        });
        req.on('end',()=>{
          let userinfo = JSON.parse(data);
          let flag = store.some(item=> item.name == userinfo.username);
          if(flag){
            for(let i=0;i<store.length;i++){
              if(store[i].name == userinfo.username){
                res.json({
                  error:0,
                  data:store[i]
                });
                break;
              }
            }
          }else{
            res.json({
              error:1,
              data:null
            })
          }
        });
      });
      app.post('/register',(req,res)=>{
        let data='';
        req.on('data',(chunk)=>{
          data+=chunk;
        });
        req.on('end',()=>{
          let userinfo = JSON.parse(data);
          let userdata = {
            id:id++,
            name:userinfo.user,
            password:userinfo.pass,
            age:userinfo.age,
            token:id+'_'+Date.now()
          }
          store.push(userdata);
          res.json({
            error:0,
            data:userdata
          })
        });
      })
    }
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
    config.plugins.delete('prefetch')
    // 移除 preload 插件(针对生产环境首屏请求数进行优化)
    config.plugins.delete('preload')
    // 第1个参数：别名，第2个参数：路径  （设置路径别名）
    config.resolve.alias
      .set('@pages', resolve('./src/page'))
      .set('@router', resolve('./src/router'))
      .set('@store', resolve('./src/store'))
      .set('@utils', resolve('./src/utils'))
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }))
    }
  }
}
