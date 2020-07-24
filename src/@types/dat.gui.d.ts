declare module 'dat.gui' {
  export class GUI extends dat.GUI {
    __controllers: dat.Controller[]
    __folders: dat.GUI[]
  }
}
