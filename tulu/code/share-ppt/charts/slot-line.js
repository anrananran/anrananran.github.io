$(function(){
    
    /*********** 普通折线图 ***********/
    {
        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data:['最高气温','最低气温'],
                textStyle: {
                    color: '#fefefe',
                },
                left: 'center',
            },
            
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
                axisLabel: {
                    fontSize: 14,
                    formatter: '{value} °C'
                },
                splitLine: {
                    lineStyle: {
                        color: ['#666'],
                        opacity: .8,
                    }
                },
            },
            series: [
                {
                    name:'最高气温',
                    type:'line',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    data:[1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };
        
        const id = 'J-line-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
        
    }
    
    /*********** 大数据量面积图 ***********/
    {
        
        let base = +new Date(1968, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let date = [];

        let data = [Math.random() * 300];

        for (let i = 1; i < 20000; i++) {
            let now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }

        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            grid: {
                top: 20,
                bottom: 90,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
                axisLabel: {
                    fontSize: 14,
                },
                splitLine: {
                    lineStyle: {
                        color: ['#666'],
                        opacity: .8,
                    }
                },
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                textStyle: {
                    color: '#fefefe',
                },
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'模拟数据',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ED3F14'
                            }, {
                                offset: .8,
                                color: '#FF8B00'
                            }])
                        }
                    },
                    data: data
                }
            ]
        };
        
        const id = 'J-line-2';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    
    /*********** 堆叠区域图: 通过面积看趋势 ***********/
    {
        
        const option = {
            color: COLORS,
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['用户','企业','社群','服务','活动'],
                left: 'center',
                textStyle: {
                    color: '#fefefe',
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日'],
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            opacity: .8,
                        }
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            opacity: .8,
                        }
                    },
                    axisLabel: {
                        fontSize: 14,
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#666'],
                            opacity: .8,
                        }
                    },
                }
            ],
            series : [
                {
                    name:'用户',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[110, 112, 130, 134, 290, 330, 380]
                },
                {
                    name:'企业',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 182, 191, 234, 290, 330, 470]
                },
                {
                    name:'社群',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 188, 201, 254, 290, 330, 410]
                },
                {
                    name:'服务',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 152, 301, 584, 690, 730, 280]
                },
                {
                    name:'活动',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[20, 72 , 90, 250, 478, 899, 999]
                }
            ]
        };
        
        const id = 'J-line-3';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
})