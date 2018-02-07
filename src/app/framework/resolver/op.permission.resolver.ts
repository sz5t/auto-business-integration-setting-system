/**
 * Created by zhaoxinlei on 2017/12/25.
 */
export class OpPermissionResolver {
  static getResourcePermission(method, resource, dataPermission) {
    let permission = null;
    const resTypePms = dataPermission.DataResPermission.ResourceTypePermissions;
    if (resTypePms
      && Array.isArray(resTypePms)
      && resTypePms.length > 0) {
      resTypePms.forEach(pms => {
        if (pms.Name === resource) {
          pms.OpPermissions && pms.OpPermissions.forEach(rpms => {
            if (rpms.Name.toLowerCase() === method.toLowerCase()) {
              permission = rpms.Permission;
            }
          });
        }
      });
    }
    return permission;
  }
}
