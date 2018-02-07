import {Component, Input, OnInit} from '@angular/core';
import {ITreeNode} from '../tree-models/tree-node-model';
import {CommonUtility} from '../../../framework/utility/common-utility';
import {ApiService} from '../../../services/api.service';
import {Broadcaster} from '../../../broadcast/broadcaster';
import {ICnComponent} from '../../component-models/component.interface';

declare let $: any;
@Component({
  selector: 'cn-tree',
  templateUrl: './cn-tree.component.html',
  styleUrls: ['./cn-tree.component.css']
})
export class CnTreeComponent implements OnInit, ICnComponent {

  @Input() componentConfig;
  GUID = CommonUtility.uuID(4);
  _rootConfigs;
  _childrenConfigs;
  _rootNodes: ITreeNode[] = [];
  _jsTree;
  private NodeFlag = {
    STATIC_NODE: 'SFDW_Classes.TStaticTreeNodeConfig',
    DYNAMIC_NODE: 'SFDW_Classes.TDynaTreeNodeConfig',
    CHILDREN_NODE: 'SFDW_Classes.TTreeNodeChildrenConfig'
  };

  constructor(private apiService: ApiService, private broadcast: Broadcaster) {
  }

  ngOnInit() {
    this.buildTree();
  }
  buildTree(){
    this._rootConfigs = this.componentConfig.rootConfigs;
    this._childrenConfigs = this.componentConfig.childConfigList;
    const promiseList = [];
    this._rootConfigs.forEach(root => {
      if (root.classType && root.classType === this.NodeFlag.STATIC_NODE) {
        promiseList.push({'func': this.createRootStaticNode, 'param': root});
      } else if (root.classType && root.classType === this.NodeFlag.DYNAMIC_NODE) {
        promiseList.push({'func': this.createRootDynamicNode, 'param': root});
      }
    });
    Promise.all((() => {
      const list: any[] = [];
      const that = this;
      promiseList.forEach(item => {
        list.push(item.func(item.param, that));
      });
      return list;
    })()).then(result => {
      $('#cnTree' + this.GUID).jstree({
        'core': {
          'themes': {
            'responsive': false
          },
          'check_callback': true,
          'data': result[0]
        }
        // 暂定不进行一下相关内容的配置解析
        /*'types': NodeType.nodeType,
         'plugins': ['types', 'wholerow', 'contextmenu'],
         contextmenu: {
         'items': function (node) {
         const type = this.get_type(node);
         const t_node = NodeType[type];
         createAction(t_node, type);
         return t_node;
         }
         }*/
      });
      this._jsTree = $('#cnTree' + this.GUID).jstree(true);



      $('#cnTree' + this.GUID).on('open_node.jstree', (event, openNode) => {
        const funcList = [];
        const nodeTypesConfig = openNode.node.data;
        // delete openNode children
        this._jsTree.delete_node(this._jsTree.get_children_dom(openNode.node));
        if (nodeTypesConfig[0].isRoot) {
          nodeTypesConfig[0].value && nodeTypesConfig[0].value.forEach(nodeType => {
            if (nodeType.classType === this.NodeFlag.STATIC_NODE) {
              const createStaticChildNode = () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    const openChildrenNodes: ITreeNode[] = [];
                    const newStaticNode: ITreeNode = {
                      id:       'nodeId_' + CommonUtility.uuID(5),
                      parent:   openNode.node.id,
                      text:     nodeType.nodeText ? nodeType.nodeText : '未命名节点',
                      icon: nodeType.icon ? nodeType.icon : '',
                      state: nodeType.state ? nodeType.state : {
                        opened: false,
                        disabled: false,
                        selected: false,
                      },
                      data: []
                    };
                    openChildrenNodes.push(newStaticNode);
                    // if exists nodeTypes and add a child node as child node flag
                    if (nodeType.nodeTypes) {
                      newStaticNode.data.push( {
                        value: nodeType.nodeTypes,
                        isRoot: true,
                        pageConfigs: nodeType.pageConfigs ? nodeType.pageConfigs : null
                      });
                      openChildrenNodes.push({id: 'nodeId_' + CommonUtility.uuID(5), text: '', parent: newStaticNode.id});
                    }
                    // sync write a node to openChildrenNodes
                    resolve(openChildrenNodes);
                  }, 0);
                });
              };
              funcList.push(createStaticChildNode);
            } else if (nodeType.classType === this.NodeFlag.DYNAMIC_NODE) {
              nodeTypesConfig && nodeTypesConfig.forEach((nodeTypeConfig) => {
                const createDynamicChildNode = () => {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      let nodeCondition = [];
                      const openChildrenNodes: ITreeNode[] = [];
                      nodeType.parameters && nodeType.parameters.forEach(parameter => {
                        nodeCondition.push(parameter);
                      });
                      nodeType.filters && nodeType.filters.forEach(filter => {
                        filter.propLinks && filter.propLinks.forEach(link => {
                          nodeCondition.push(link.slaveProp + '=' + nodeTypeConfig.parentNodeItem[link.masterProp]);
                          //nodeCondition +=  + '&';
                        });
                      });

                      this.apiService.doGet2<any>(nodeType.entityClass + '?' + nodeCondition.join('&'))
                        .toPromise()
                        .then(response => {
                          response.Data.forEach(item => {
                            const newDynamicNode: ITreeNode = {
                              id : 'nodeId_' + CommonUtility.uuID(5),
                              parent : openNode.node.id,
                              text : item[nodeType.textKey],
                              data: []
                            };

                            openChildrenNodes.push(newDynamicNode);
                            this._childrenConfigs && this._childrenConfigs.forEach(childConfig => {
                              if (childConfig.classType === this.NodeFlag.CHILDREN_NODE) {
                                if (childConfig.columnConfigsClass === nodeType.entityClass) {

                                  // 子节点集合中与根节点集合匹配的动态元素
                                  if (childConfig.nodeTypes) {
                                    newDynamicNode.data.push({
                                      value : childConfig.nodeTypes,
                                      isRoot : false,
                                      idKey : childConfig.idkey,
                                      parentNodeItem: item,
                                      entityClass: childConfig.entityClass,
                                      pageConfigs: childConfig.pageConfigs ? childConfig.pageConfigs : null
                                    });
                                    openChildrenNodes.push({
                                      id: 'nodeId_' + CommonUtility.uuID(5),
                                      text: '',
                                      parent: newDynamicNode.id
                                    });
                                  }
                                }
                              }
                            });
                          });
                          resolve(openChildrenNodes);
                        });
                    }, 10);
                  });
                };
                funcList.push(createDynamicChildNode);
              });
            }
          });
        }
        else{
          nodeTypesConfig.forEach((nodeTypeConfig) => {
            nodeTypeConfig.value && nodeTypeConfig.value.forEach(nodeType => {
              if (nodeType.classType === this.NodeFlag.STATIC_NODE) {
                const createStaticChildNode = () => {
                  return new Promise(resolve => {
                    const openChildrenNodes: ITreeNode[] = [];
                    //添加新节点
                    const newStaticNode: ITreeNode = {
                      id : 'nodeId_' + CommonUtility.uuID(5),
                      text : nodeType.nodeText ? nodeType.nodeText : '未命名节点',
                      parent : openNode.node.id
                    };
                    openChildrenNodes.push(newStaticNode);
                    if (nodeType.nodeTypes) {
                      const newChildNode: ITreeNode = {
                        id : 'nodeId_' + CommonUtility.uuID(5),
                        text : '',
                        parent : newStaticNode.id
                      };
                      newStaticNode.data = {
                        value: nodeType.nodeTypes,
                        isRoot: false,
                        parentNodeItem: nodeTypeConfig.parentNodeItem ? nodeTypeConfig.parentNodeItem : null
                      };
                      openChildrenNodes.push(newChildNode);
                    }
                    resolve(openChildrenNodes);
                  });
                };
                funcList.push(createStaticChildNode);
              }
              else if (nodeType.classType === this.NodeFlag.DYNAMIC_NODE) {

                const createDynamicChildNode = () => {
                  return new Promise(resolve => {
                    let nodeCondition = [];
                    const openChildrenNodes: ITreeNode[] = [];
                    nodeType.parameters && nodeType.parameters.forEach(parameter => {
                      nodeCondition.push(parameter);
                    });
                    nodeType.filters && nodeType.filters.forEach(filter => {
                      filter.propLinks && filter.propLinks.forEach(link => {
                        nodeTypeConfig.parentNodeItem && nodeCondition.push(link.slaveProp + '=' + nodeTypeConfig.parentNodeItem[link.masterProp]);
                      });
                    });
                    this.apiService.doGet2<any>(nodeType.entityClass + '?' + nodeCondition.join('&'))
                      .toPromise()
                      .then(response => {
                        response.Data.forEach(item => {
                          const newDynamicNode: ITreeNode = {
                            id : 'nodeId_' + CommonUtility.uuID(5),
                            parent : openNode.node.id,
                            text : item[nodeType.textKey],
                            data: []
                          };

                          openChildrenNodes.push(newDynamicNode);
                          this._childrenConfigs && this._childrenConfigs.forEach(childConfig => {
                            if (childConfig.classType === this.NodeFlag.CHILDREN_NODE) {
                              if (childConfig.columnConfigsClass === nodeType.entityClass) {
                                if (childConfig.nodeTypes) {
                                  // const newChildDynamicNode: ITreeNode = {
                                  //   id: 'nodeId_' + CommonUtility.uuID(5),
                                  //   parent: item[nodeType.idKey],
                                  //   text: '',
                                  //   data: []
                                  // };
                                  newDynamicNode.data.push({
                                    data: childConfig.NodeTypes,
                                    isRoot: false,
                                    parentNodeItem: item,
                                    idKey: nodeType.idKey,
                                    entityClass: childConfig.entityClass,
                                    pageConfigs: childConfig.pageConfigs ? childConfig.pageConfigs : null
                                  });
                                  //openChildrenNodes.push(newChildDynamicNode);
                                }
                              }
                            }
                          });
                        });
                        resolve(openChildrenNodes);
                      });
                  });
                };
                funcList.push(createDynamicChildNode);
              }
            });
          })

        }
        Promise.all((() => {
          const list: any[] = [];
          funcList.forEach(item => {
            list.push(item());
          });
          return list;
        })()).then(result => {
          setTimeout(() => {
            result.forEach(s => {
              s.forEach(item => {
                this._jsTree.create_node(item.parent, item, 'last', () => {
                }, true);
              });
            });
          }, 100);

        });

      });
      $('#cnTree' + this.GUID).on('after_close.jstree', (event, openNode) => {
        const $nodes = this._jsTree.get_json(openNode.node.id).children;
        this._jsTree.delete_node($nodes);
        this._jsTree.create_node(openNode.node.id, '', 'last', () => {
        }, true);
      });
      $('#cnTree' + this.GUID).on('select_node.jstree', (event, node) => {
        node.node.data && this.broadcast.broadcast(this.componentConfig.viewId, node.node.data[0]);
      });
    });
  }

  createRootStaticNode(root, local) {
    return new Promise(resolve => {
      const rootStaticNode: ITreeNode = {
        id :       'nodeId_' + CommonUtility.uuID(5),
        parent: root.parent ? root.parent : '#',
        text :     root.nodeText ? root.nodeText : '未命名节点',
        icon :     root.icon     ? root.icon     : '',
        li_attr :  root.attr     ? root.attr     : '',
        a_attr :   root.href     ? root.href     : '',
        //children: [],
        data: [],
        state :    root.state    ? root.state    : {
          opened: false,
          disabled: false,
          selected: false
        }
      };
      if (root.nodeTypes && root.nodeTypes.length > 0) {
        rootStaticNode.data.push({
          value: root.nodeTypes,
          isRoot: true,
          pageConfigs: root.pageConfigs ? root.pageConfigs : null
        });
        local._rootNodes.push({id: CommonUtility.uuID(5), parent: rootStaticNode.id, text: ''});
      }
      local._rootNodes.push(rootStaticNode);
      resolve(local._rootNodes);
    });

  }

  createRootDynamicNode(root, local) {
    return new Promise(resolve => {
      local.apiService.doList(root.entityClass, root.parameters)
        .toPromise().then(
          response => {
            response.Data.forEach(item => {
              const dyncRootNode: ITreeNode = {
                id :       'nodeId_' + CommonUtility.uuID(5),
                parent: item.parent ? item.parent : '#',
                text :     item[root.textKey] ? item[root.textKey] : '未命名节点',
                // icon :     item.img     ? item.img     : '',
                // li_attr :  item.attr     ? item.attr     : '',
                // a_attr :   item.href     ? item.href     : '',
                // readonly : item.readonly ? item.readonly : true,
                data: [],
                state :    item.state    ? item.state    : {
                  opened: false,
                  disabled: false,
                  selected: false,
                }
              };

              local._childrenConfigs && local._childrenConfigs.forEach(child => {
                if (child.classType === local.NodeFlag.CHILDREN_NODE) {
                  if (child.entityClass === root.entityClass) {
                    if (child.nodeTypes) {
                      dyncRootNode.data.push({
                        value: child.nodeTypes,
                        isRoot: true,
                        parentNodeItem: item,
                        idKey: root.idKey ? root.idKey : ''
                      });
                      local._rootNodes.push({id: CommonUtility.uuID(5), parent: dyncRootNode.id, text: ''});
                    }
                  }
                }
              });
              local._rootNodes.push(dyncRootNode);
            });
            resolve(local._rootNodes);
          }
        );
    });
  }
}
