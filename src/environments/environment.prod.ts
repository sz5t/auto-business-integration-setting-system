
export const environment = {
  production: true,
  web_api: '',
  resource_menu: '',
  commonCode_code: '',
  commonCode_resource : 'SinoForce.Data.SysCommonCode',
  onlineUser_resource : 'SinoForce.Data.OnlineUser',
  appUser_resource : 'SinoForce.Data.AppUser',
  appModule_resource: 'SinoForce.AppProject.AppModuleConfig',
  configMenu_response : '../assets/data/menuAnalyze.json',
  config_system : '配置',
  anlyze_system : '运行',
  setHost(parm1: string): string {
    this.web_api = (parm1.indexOf( 'Login') > 0 || parm1 === 'Login') ? 'http://192.168.1.8:8016/eb43/Res/' :
      'http://192.168.1.8:8016/f277/Res/';
    // console.log(parm1,this.web_api,$('#sysFlag').val(),'环境变量配置页面');
    if(parm1.indexOf( 'Login') > 0 || parm1 === 'Login') {
      // this.resource_menu = '../assets/data/menuAnalyze.json';
      this.commonCode_code = '{WEB应用运行平台}';
      return this.anlyze_system;
    }else {
      this.resource_menu = '../assets/data/menu.json';
      this.commonCode_code = '{WEB前端标识}';
      return this.config_system;
    }
  },
  getKey(url: string, key: string): string  {
    url = (url.startsWith('/app') ? url : '/app' +  url ) + key + $('#sysFlag').val()
    // console.log('clientStorageService', url.substring(5));
    return url.substring(5);
  }
};
