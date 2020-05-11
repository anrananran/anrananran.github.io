$(function(){
    /************ 普通饼图 *************/
    {
        const option = {
            color: COLORS,
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                left: 'center',
                data: ['迷你鱼','小鱼','中鱼','大鱼'],
                textStyle: {
                    color: '#fefefe',
                },
                itemGap: 20,
            },
            series : [
                {
                    name: '小鱼易连（单位/万）',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'迷你鱼'},
                        {value:310, name:'小鱼'},
                        {value:234, name:'中鱼'},
                        {value:135, name:'大鱼'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        }
                    }
                }
            ]
        };
        
        const id = 'J-pie-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    /************ 玫瑰图 *************/
    {
        const option = {
            color:COLORS,
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 2000,
                inRange: {
                    colorLightness: [.3, .6]
                }
            },
            series : [
                {
                    name:'社群',
                    type:'pie',
                    radius : '80%',
                    center: ['50%', '50%'],
                    data:[
                        {value:1240, name:'协会'},
                        {value:310, name:'组织'},
                        {value:800, name:'商会'},
                        {value:365, name:'学会'},
                        {value:125, name:'联盟'},
                        {value:420, name:'社团'},
                        {value:1500, name:'社区'},
                        {value:990, name:'园区'},
                        {value:380, name:'商圈'},
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius', //圆心角展现数据的百分比，半径展示数据的大小
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fefefe'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#ccc',
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 50,
                            shadowColor: 'rgba(0, 0, 0, 0.4)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        
        const id = 'J-pie-2';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    /************ 环形图 *************/
    {
        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                left: 'center',
                data:['迷你鱼','小鱼','中鱼','大鱼','大大鱼'],
                textStyle: {
                    color: '#fefefe',
                }
            },
            series: [
                {
                    name:'销售占比',
                    type:'pie',
                    radius: ['60%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#fefefe',
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'迷你鱼'},
                        {value:310, name:'小鱼'},
                        {value:234, name:'中鱼'},
                        {value:135, name:'大鱼'},
                        {value:1548, name:'大大鱼'},
                    ]
                }
            ]
        };

        const id = 'J-pie-3';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    /*************** 旭日图 ***************/
    {
        const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
        const bgColor = '#2E2733';
    
        const itemStyle = {
            star5: {
                color: colors[0]
            },
            star4: {
                color: colors[1]
            },
            star3: {
                color: colors[2]
            },
            star2: {
                color: colors[3]
            }
        };
    
        const data = [
            {
                name: '前端',
                itemStyle: {
                    normal: {
                        color: colors[1]
                    }
                },
                children: [
                    {
                        name: 'JavaScript',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'JavaScript高级程序设计'
                                    }, {
                                        name: '编写可维护的JavaScript'
                                    }, {
                                        name: 'Javascript语言精粹'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'jQuery 权威指南'
                                    }, {
                                        name: 'JavaScript DOM 编程艺术'
                                    }, {
                                        name: '高性能 JavaScript'
                                    }
                                ]
                            }, {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'ECMAScript 6 标准入门'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'CSS3',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'HTML5 与 CSS3 基础教程'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: '深入浅出 HTML 与 CSS'
                                    }, {
                                        name: 'CSS揭秘'
                                    }
                                ]
                            }, {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'HTML5 权威指南'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: '后端',
                itemStyle: {
                    color: colors[2]
                },
                children: [
                    {
                        name: 'Python',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Python基础教程'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: '笨办法学Python'
                                    }, {
                                        name: 'Python核心编程'
                                    }
                                ]
                            }, {
                                name: '3☆',
                                children: [
                                    {
                                        name: '利用 Python 进行数据分析'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'Java开发',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'Java8 实战'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Java并发编程实战'
                                    }, {
                                        name: 'Java性能权威指南'
                                    }, {
                                        name: 'Java程序员修炼之道'
                                    }
                                ]
                            }, {
                                name: '3☆',
                                children: [
                                    {
                                        name: '实战Java高并发程序设计'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: '.NET',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: '精通C#'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: '深入理解C#'
                                    }, {
                                        name: 'CLR via C#'
                                    }
                                ]
                            }, {
                                name: '3☆'
                            }, {
                                name: '2☆',
                                children: [
                                    {
                                        name: 'C语言接口与实现'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: '机器学习',
                        children: [
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: '数据之巅'
                                    }, {
                                        name: '矩阵分析'
                                    }, {
                                        name: '统计学习方法'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: '数据库',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'SQL应用重构'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: '高性能MySQL'
                                    }, {
                                        name: '深入浅出SQL'
                                    }
                                ]
                            }, {
                                name: '3☆',
                                children: [
                                    {
                                        name: 'MySQL技术内幕 : InnoDB存储引擎'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'C++',
                        children: [
                            {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'C++语言的设计与演化'
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'iOS',
                        children: [
                            {
                                name: '5☆',
                                children: [
                                    {
                                        name: 'iOS编程实战'
                                    }
                                ]
                            }, {
                                name: '4☆',
                                children: [
                                    {
                                        name: 'Objective-C高级编程'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    
        for (var j = 0; j < data.length; ++j) {
            var level1 = data[j].children;
            for (var i = 0; i < level1.length; ++i) {
                var block = level1[i].children;
                var bookScore = [];
                var bookScoreId;
                for (var star = 0; star < block.length; ++star) {
                    var style = (function(name) {
                        switch (name) {
                            case '5☆':
                                bookScoreId = 0;
                                return itemStyle.star5;
                            case '4☆':
                                bookScoreId = 1;
                                return itemStyle.star4;
                            case '3☆':
                                bookScoreId = 2;
                                return itemStyle.star3;
                            case '2☆':
                                bookScoreId = 3;
                                return itemStyle.star2;
                        }
                    })(block[star].name);
    
                    block[star].label = {
                        color: style.color,
                        downplay: {
                            opacity: 0.5
                        }
                    };
    
                    if (block[star].children) {
                        style = {
                            opacity: 1,
                            color: style.color
                        };
                        block[star].children.forEach(function(book) {
                            book.value = 1;
                            book.itemStyle = style;
    
                            book.label = {
                                color: style.color
                            };
    
                            var value = 1;
                            if (bookScoreId === 0 || bookScoreId === 3) {
                                value = 5;
                            }
    
                            if (bookScore[bookScoreId]) {
                                bookScore[bookScoreId].value += value;
                            } else {
                                bookScore[bookScoreId] = {
                                    color: colors[bookScoreId],
                                    value: value
                                };
                            }
                        });
                    }
                }
    
                level1[i].itemStyle = {
                    color: data[j].itemStyle.color
                };
            }
        }
    
        const option = {
            color: colors,
            series: [
                {
                    type: 'sunburst',
                    center: [
                        '50%', '48%'
                    ],
                    data: data,
                    sort: function(a, b) {
                        if (a.depth === 1) {
                            return b.getValue() - a.getValue();
                        } else {
                            return a.dataIndex - b.dataIndex;
                        }
                    },
                    label: {
                        rotate: 'radial',
                        color: bgColor
                    },
                    itemStyle: {
                        borderColor: bgColor,
                        borderWidth: 2
                    },
                    levels: [
                        {}, {
                            r0: 0,
                            r: 40,
                            label: {
                                rotate: 0
                            }
                        }, {
                            r0: 40,
                            r: 105
                        }, {
                            r0: 115,
                            r: 140,
                            itemStyle: {
                                shadowBlur: 2,
                                shadowColor: colors[2],
                                color: 'transparent'
                            },
                            label: {
                                rotate: 'tangential',
                                fontSize: 10,
                                color: colors[0]
                            }
                        }, {
                            r0: 140,
                            r: 145,
                            itemStyle: {
                                shadowBlur: 80,
                                shadowColor: colors[0]
                            },
                            label: {
                                position: 'outside',
                                textShadowBlur: 5,
                                textShadowColor: '#333'
                            },
                            downplay: {
                                label: {
                                    opacity: 0.5
                                }
                            }
                        }
                    ]
                }
            ]
        };
        
        const id = 'J-pie-4';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
})