const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.pdf':'application/pdf','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{let pathname=decodeURIComponent((req.url||'/').split('?')[0]);if(pathname==='/'||pathname.endsWith('/'))pathname='/index.html';let target=path.resolve(root,'.'+pathname);if(!target.startsWith(root))target=path.join(root,'index.html');if(!fs.existsSync(target)||fs.statSync(target).isDirectory())target=path.join(root,'index.html');res.writeHead(200,{'Content-Type':types[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(target).pipe(res)}).listen(process.env.PORT||4173,process.env.HOST||'127.0.0.1',()=>console.log(`Grab dashboard: http://localhost:${process.env.PORT||4173}`));
