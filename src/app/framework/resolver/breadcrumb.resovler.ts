/**
 * Created by zhaoxinlei on 2017/10/26.
 */
export class BreadcrumbResolver{
  private _config;
  private breadcrumbData: Map<string,Breadcrumb> = new Map<string,Breadcrumb>();
  constructor(config){
    this._config = config;
  }
  get config(){
    this._config.forEach(x =>{
      if(x.sub && Array.isArray(x.sub)){
        x.sub.forEach(s => {
          this.breadcrumbData.set(s.name, new Breadcrumb(s.name,{title:s.title,desc:s.description,breadcrumbs:[x.title,s.title]}))
        })
      }
    });
    return this.breadcrumbData;
  }
}
export class Breadcrumb {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get breadcrumb(): any {
    return this._breadcrumb;
  }

  set breadcrumb(value: any) {
    this._breadcrumb = value;
  }
  private _name: string;
  private _breadcrumb: any;
  constructor(private n, private b){
    this.name = n;
    this.breadcrumb = b;
  }
}
