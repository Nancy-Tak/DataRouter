/*
 Routes 路由配置
 */
import React from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import Auth from 'COM/authorization';
import MAP from 'STATIC';
import cookie from 'react-cookie';
const routes = [
    // 登录
    {
        path: 'userLogin(/:status)',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('PAGES/userLogin').default);
            }, 'userLogin');
        }
    },
    {
        path: 'templatePreview/:id',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('PAGES/product/productTemplate/preView').default);
            }, 'templatePreview');
        }
    },
    {
        component: require('PAGES/layouts').default,
        childRoutes: [
            {
                path: '/',
                indexRoute: {
                    onEnter: (nextState, replace) => replace('', 'userLogin')
                },
            },
            {//数据查询
                path: 'search',
                breadcrumbName: "数据查询",
                indexRoute: {
                    onEnter: (nextState, replace) => replace('', '/search/select')
                },
                component: require('PAGES/search').default,
                childRoutes: [
                    {
                        path: 'select',
                        breadcrumbName: "",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/select').default)
                            }, 'search-select')
                        },
                    },
                    {
                        path: 'query/personalCredit',
                        breadcrumbName: "个人信贷多次申请核查",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/query/personalCredit').default)
                            }, 'search-query-personalCredit')
                        },
                    },
                    {
                        path: 'query/personalRiskInfo',
                        breadcrumbName: "个人风险信息报告",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/query/personalRiskInfo').default)
                            }, 'search-query-personalRiskInfo')
                        },
                    },
                    {
                        path: 'query/personalStability',
                        breadcrumbName: "稳定性评估",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/query/personalStability').default)
                            }, 'search-query-personalStability')
                        },
                    },
                    {
                        path: 'query/consumerBehaviors',
                        breadcrumbName: "消费及月度收支等级评估",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/query/consumerBehaviors').default)
                            }, 'search-query-consumerBehaviors')
                        },
                    },
                    {
                        path: 'query/(:id)',
                        breadcrumbName: "具体产品查询界面",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/search/query').default)
                            }, 'search-query')
                        },
                    },
                ]
            },
            {//数据机构管理
                path: 'source',
                breadcrumbName: "数据源管理",
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        Auth.route([MAP.AUTH_MAP['数据机构管理'],
                            MAP.AUTH_MAP['源产品管理'], MAP.AUTH_MAP['源产品更新周期配置']], replace, ['/source/data/home', '/source/products/home', '/source/setting/settingHome'])
                    }
                },
                component: require('PAGES/source').default,
                childRoutes: [
                    {
                        path: 'data',  //数据机构管理
                        breadcrumbName: "数据机构管理",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/source/data/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/data/home').default)
                                    }, 's-d-home')
                                }
                            },
                            {
                                path: 'detail(/:obj)',
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/data/detail').default)
                                    }, 's-d-detail')
                                }
                            },
                            {
                                path: 'editor(/:obj)',  //编辑
                                breadcrumbName: "编辑",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/data/editor').default)
                                    }, 's-d-editor')
                                }
                            },
                        ],
                    },
                    {
                        path: 'products',  //源产品管理
                        breadcrumbName: "源产品管理",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/source/products/home')
                        },
                        childRoutes: [
                            {
                                path: 'home(/:id)',  //详情
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/products/home').default)
                                    })
                                }
                            },
                            {
                                path: 'detail(/:obj)',  //详情
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/products/detail').default)
                                    }, 's-p-detail')
                                }
                            },
                            {
                                path: 'editor(/:obj)',  //编辑
                                breadcrumbName: "编辑",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/products/editor').default)
                                    }, 's-p-editor')
                                }
                            },
                        ]
                    },
                    {
                        path: 'setting',  //源产品更新周期配置
                        breadcrumbName: "源产品更新周期配置",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/source/setting/settingHome')
                        },
                        childRoutes: [
                            {
                                path: 'settingHome(/:id)',  //详情
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/setting/settingHome').default)
                                    }, 's-s-settingHome')
                                }
                            },
                            {
                                path: 'detail',  //详情
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/setting/detail').default)
                                    }, 's-s-detail')
                                }
                            },
                            {
                                path: 'editor(/:id)',  //编辑
                                breadcrumbName: "编辑",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/source/setting/editor').default)
                                    }, 's-s-editor')
                                }
                            },
                        ]
                    },
                ]
            },
            {//内部产品管理
                path: 'product',
                breadcrumbName: "内部产品管理",
                component: require('PAGES/product').default,
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        Auth.route([MAP.AUTH_MAP['内部产品类型管理'], MAP.AUTH_MAP['内部产品模板管理']], replace, ['/product/productType', '/product/productTemplate/home'])
                    }
                },
                childRoutes: [
                    {
                        path: 'productType',  //内部产品类型管理
                        breadcrumbName: "内部产品类型管理",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/product/productType').default)
                            }, 'p-productType')
                        },
                    },
                    {
                        path: 'productTemplate',  //内部产品模板管理
                        breadcrumbName: "内部产品模板管理",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/product/productTemplate/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',
                                breadcrumbName: "",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/product/productTemplate/home').default)
                                    }, 'p-p-home')
                                }
                            },
                            {
                                path: 'preView/(:id)',  //模板预览
                                breadcrumbName: "模板预览",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/product/productTemplate/preView').default)
                                    }, 'p-p-preView')
                                }
                            },
                            {
                                path: 'edit/(:id)',  //编辑
                                breadcrumbName: "编辑",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/product/productTemplate/edit').default)
                                    }, 'p-p-edit')
                                }
                            },
                        ]
                    },
                ]
            },
            {//账号管理
                path: 'account',
                breadcrumbName: "子账号管理",
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('PAGES/account').default)
                    }, 'account');
                },
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        Auth.route([MAP.AUTH_MAP['员工账号'], MAP.AUTH_MAP['角色权限']], replace, ['/account/accountManage/home', '/account/roleManage/home'])
                    }
                },
                childRoutes: [
                    {
                        path: 'accountManage',
                        breadcrumbName: "员工账号",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/account/accountManage/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',
                                breadcrumbName: "",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/accountManage/home').default)
                                    }, 'a-a-home')
                                }
                            },
                            {
                                path: 'edit/:id',
                                breadcrumbName: "编辑子账号",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/accountManage/edit').default)
                                    }, 'a-a-edit')
                                }
                            },
                            {
                                path: 'add',
                                breadcrumbName: "添加账号",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/accountManage/add').default)
                                    }, 'a-a-add')
                                }
                            },
                            {
                                path: 'resetPassword/:id/:accountName',
                                breadcrumbName: "重置密码",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/accountManage/resetPassword').default)
                                    }, 'a-a-resetPassword')
                                }
                            },
                        ]
                    },
                    {
                        path: 'roleManage',
                        breadcrumbName: "角色权限",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/account/roleManage/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',
                                breadcrumbName: "",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/roleManage/home').default)
                                    }, 'a-r-home')
                                }
                            },
                            {
                                path: 'edit/:id',
                                breadcrumbName: "编辑角色",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/roleManage/edit').default)
                                    }, 'a-r-edit')
                                }
                            },
                            {
                                path: 'add',
                                breadcrumbName: "添加角色",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/roleManage/add').default)
                                    }, 'a-r-add')
                                }
                            },
                            {
                                path: 'viewInfo/:id',
                                breadcrumbName: "查看角色",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/account/roleManage/viewInfo').default)
                                    }, 'a-r-viewInfo')
                                }
                            },
                        ]
                    },
                ]
            },
            {//历史查询记录
                path: 'history',
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        Auth.route(
                            [MAP.AUTH_MAP['数据源查询记录'], MAP.AUTH_MAP['内部产品查询记录'], MAP.AUTH_MAP['用户查询记录']], replace, ['/history/data', '/history/internal/home', '/history/user/home'])
                    }
                },
                component: require('PAGES/history').default,
                breadcrumbName: "查询记录",
                childRoutes: [
                    {
                        path: 'data',  //数据源查询记录
                        breadcrumbName: "数据源查询记录",
                        childRoutes: [
                            {
                                path: 'home(/:id)',  //数据源查询记录
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/data/home').default)
                                    }, 'h-d-home')
                                }
                            },
                            {
                                path: 'detail/(:obj)',  //数据源查询记录
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/data/detail').default)
                                    }, 'h-d-detail')
                                }
                            },
                        ]
                    },
                    {
                        path: 'internal',  //内部产品查询记录
                        breadcrumbName: "内部产品查询记录",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/history/internal/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',  //数据源查询记录
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/internal/home').default)
                                    }, 'h-i-home')
                                }
                            },
                            {
                                path: 'detail/(:obj)',  //数据源查询记录
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/internal/detail').default)
                                    }, 'h-i-detail')
                                }
                            },
                        ]
                    },
                    {
                        path: 'user',  //用户查询记录
                        breadcrumbName: "用户查询记录",
                        indexRoute: {
                            onEnter: (nextState, replace) => replace('', '/history/user/home')
                        },
                        childRoutes: [
                            {
                                path: 'home',  //数据源查询记录
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/user/home').default)
                                    }, 'h-u-home')
                                }
                            },
                            {
                                path: 'detail/(:templateId)/(:productCode)/(:queryCode)',  //数据源查询记录
                                breadcrumbName: "详情",
                                getComponent(nextState, cb) {
                                    require.ensure([], (require) => {
                                        cb(null, require('PAGES/history/user/detail').default)
                                    }, 'h-u-detail')
                                }
                            },
                        ]
                    },
                ]
            },
            {//账号管理
                path: 'system',
                breadcrumbName: "系统管理",
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('PAGES/system').default)
                    }, 'system');
                },
                indexRoute: {
                    onEnter: (nextState, replace) => {
                        Auth.route([MAP.AUTH_MAP['账号信息'], MAP.AUTH_MAP['修改密码']], replace, ['/system/accountInfo', '/system/resetPassword'])
                    }
                },
                childRoutes: [
                    {
                        path: 'accountInfo',
                        breadcrumbName: "账号信息",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/system/accountInfo').default)
                            }, 's-accountInfo')
                        }
                    },
                    {
                        path: 'resetPassword',
                        breadcrumbName: "修改密码",
                        getComponent(nextState, cb) {
                            require.ensure([], (require) => {
                                cb(null, require('PAGES/system/resetPassword').default)
                            }, 's-resetPassword')
                        }
                    },
                ]
            },
            {
                path: 'error',// 业务错误页面
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('PAGES/error').default)
                    }, 'error')
                }
            },
            {
                path: '*',   // 404
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('PAGES/404').default);
                    }, 'error');
                }
            }
        ]
    }
];
export default routes;
