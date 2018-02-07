/**
 * Created by zhaoxinlei on 2017/10/31.
 */
export class ConfigAdapter {
  public static moduleFinder(configs, templateName) {
    let allSubs = [];
    configs.forEach(config => {
      if (config.sub && config.sub.length > 0) {
        allSubs = allSubs.concat(config.sub);
      }
    });

    return allSubs.filter(item => {
      if (item.name) {
        return item.name === templateName;
      }
      return false;
    });
  }
}
