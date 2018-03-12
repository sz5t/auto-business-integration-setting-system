// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  web_api: '',
  resource_menu:'',
  setHost(parm1: string): string{
    this.web_api = (parm1.indexOf( 'Login') > 0 || parm1 === 'Login') ? 'http://syg:8016/eb43/Res/' : 'http://syg:8016/f277/Res/';
    // console.log(parm1,this.web_api,$('#sysFlag').val(),'环境变量配置页面');
    if(parm1.indexOf( 'Login') > 0 || parm1 === 'Login') {
      this.resource_menu = '../assets/data/menuAnalyze.json';
      return '运行';
      }else {
      this.resource_menu = '../assets/data/menu.json';
      return '配置';
      }
    }
  };
