/**
 * Created by zhaoxinlei on 2017/10/26.
 */
export class SideBarResolver {
  private _config:any[];
  constructor(config){
    this._config = config;
  }
  get config(){
    //let sidebarConfig = [];
    /*this._config.forEach(c => {
      //const configItem = {...c};
      if(c.sub){
        c.sub.forEach(s =>{
          delete s.totalArea;
        });
      }
      //sidebarConfig.push(configItem);
    });*/
    //return sidebarConfig;
    return this._config;
  }
}
