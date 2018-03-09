/**
 * Created by zhaoxinlei on 2017/10/9.
 */
export class Configuration {
  // 配置平台：f277   运行平台：eb43


  //配置平台
  //  public static web_api = 'http://syg:8016/f277/Res/';
  // public static commonCode_code = '0802485694b15944804043629bdbe1d2.FormTemplateConfig.1';
  // public static appPermission_response = 'SinoForce.Data.AppPermission/Func.SinoForce客户端';

  //运行平台
  // public static web_api = 'http://syg:8016/eb43/Res/';

  public static commonCode_code = '0802485694b15944804043629bdbe1d2.FormTemplateConfig.0';
  public static appPermission_response = 'SinoForce.Data.AppPermission/Func.SinoForceWeb端';

  public static config_resource = '../assets/data/layout.json';
  public static onlineUser_resource = 'SinoForce.Data.OnlineUser';
  public static appUser_resource = 'SinoForce.Data.AppUser';
  public static commonCode_resource = 'SinoForce.Data.SysCommonCode';
  public static dataPermission_response = 'SinoForce.Data.AppPermission/Data';
  public static appConfig_resource = 'SinoForce.Data.AppConfigPack';
  public static configMenu_response = '../assets/data/menu.json';
  public static HJ_AllAppConfig = 'AllModuleConfig';

  public static mock_api = 'http://category.cn';

  public static menuNavItemType = 'nav-item';


  public static AppPermissionType = {
    PERMITTED: 'Permitted',
    NOT_SET: 'NotSet',     // 未设置，可设定系统策略来确定默认值
    INVISIBLE: 'Invisible',  // 不可见
    DISABLED: 'Disabled',   // 不可用
  };
}
export class RenderColumnType {
  public static RENDER_COLUMN_TYPE = {
    NOT_NULL: 'notNull',
    CHECK_ALL: 'checkAll',
    BUTTONS: 'handleButtons',
    BUTTON_COMMON: 'commonButton',
    BUTTON_CONFIRM: 'confirmButton',
    CELL_STYLE: 'cellStyle',
    CELL_DATE: 'date',
    CELL_TIME: 'datetime',
    CELL_NUMBER: 'number'
  };
}
