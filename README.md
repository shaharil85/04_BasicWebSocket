Credit to this Website:
https://devdactic.com/ionic-4-socket-io/

1. Install library of socket io:

    npm install ngx-socket-io

2. Chang app/polyfills.ts
   add one more line at the end line:
    
   (window as any).global = window;

3. Import library to app.module.ts
    import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

    const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
    
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SocketIoModule.forRoot(config)],
 

4. Write coding in home.page.ts and home.page.ts