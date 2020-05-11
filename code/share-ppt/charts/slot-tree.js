$(function() {
    
    const data = {
        "name": "3.5版本菜单",
        "children": [
            {
                "name" : "企业资料",
                "value": 80,
            },
            {
                "name" : "个人资料",
                "value": 80,
                "children": [
                    {
                        "name" : "基础信息",
                        "value": 80,
                    },
                    {
                        "name" : "修改密码",
                        "value": 80,
                    },
                ],
            },
            {
                "name" : "我的社群",
                "value": 80,
            },
            {
                "name" : "我的活动",
                "value": 80,
            },
            {
                "name" : "社群管理",
                "value": 80,
                "children": [
                    {
                        "name" : "社群资料",
                        "value": 80,
                    },
                    {
                        "name" : "成员管理",
                        "value": 80,
                        "children": [
                            {
                                "name" : "群内企业",
                                "value": 80,
                            },
                            {
                                "name" : "下级子群",
                                "value": 80,
                            },
                        ],
                    },
                    {
                        "name" : "发布管理",
                        "value": 80,
                        "children": [
                            {
                                "name" : "内部公告",
                                "value": 80,
                            },
                            {
                                "name" : "内部交流",
                                "value": 80,
                            },
                            {
                                "name" : "内部活动",
                                "value": 80,
                            },
                            {
                                "name" : "通知",
                                "value": 80,
                            },
                        ],
                    },
                    {
                        "name" : "社群风采",
                        "value": 80,
                        "children": [
                            {
                                "name" : "页面设置",
                                "value": 80,
                            },
                            {
                                "name" : "社群动态",
                                "value": 80,
                            },
                            {
                                "name" : "首页推荐",
                                "value": 80,
                            },
                        ],
                    },
                ],
            },
            {
                "name" : "店铺管理",
                "children": [
                    {
                        "name" : "店铺设置",
                        "value": 80,
                    },
                    {
                        "name" : "服务管理",
                        "value": 80,
                    },
                ],
            },
        ],
    }
    
    
    /***************树图******************/
    {
    
        const option = {
            colors: COLORS,
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
            },
            series: [
                {
                    type: 'tree',

                    data: [data],

                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    
                    itemStyle:{
                        borderColor: '#333',
                        borderWidth: 2,
                    },
                    symbolSize: 20,

                    label: {
                        normal: {
                            position: [30,30],
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 12,
                            color: '#fefefe',
                        }
                    },

                    

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        };
        
        const id = 'J-tree-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    /***************矩形树图******************/
    {
        const option = {
            color: COLORS,
            series: [{
                type: 'treemap',
                data: data.children,
                name: '3.5新版菜单',
                visibleMin: 300,
                leafDepth: 2,
                levels: [
                    {
                        itemStyle: {
                            normal: {
                                borderColor: '#555',
                                borderWidth: 4,
                                gapWidth: 4
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.6],
                        itemStyle: {
                            normal: {
                                borderColorSaturation: 0.7,
                                gapWidth: 2,
                                borderWidth: 2
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.5],
                        itemStyle: {
                            normal: {
                                borderColorSaturation: 0.6,
                                gapWidth: 1
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.5]
                    }
                ]
            }]
        };
        
        const id = 'J-tree-2';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
})