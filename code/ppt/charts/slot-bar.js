$(function(){
    /************ 普通柱状图 *************/
    {
        
        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年'],
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
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#666'],
                        opacity: .8,
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
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
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        };
        
        const id = 'J-bar-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    /************ 堆叠条形图 *************/
    {
        
        const option = {
            color: COLORS,
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['用户', '企业','社群','服务','活动'],
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
            xAxis:  {
                type: 'value',
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
            yAxis: {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日'],
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
            series: [
                {
                    name: '用户',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '企业',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '社群',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '服务',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: '活动',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        
        const id = 'J-bar-2';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    
    /************ 极坐标堆叠柱状图 *************/
    {
        
        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'axis',
            },
            angleAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
                axisLabel: {
                    fontSize: 14,
                    color: '#fefefe',
                },
            },
            radiusAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四'],
                z: 10,
                axisLine: {
                    lineStyle: {
                        color: '#ccc',
                        opacity: .8,
                    }
                },
                
            },
            legend: {
                show: true,
                data: ['A', 'B', 'C'],
                textStyle: {
                    color: '#fefefe',
                },
                padding: 0,
                top: 0,
                left: 'center',
                itemGap: 20,
            },
            polar: {
            },
            series: [{
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a'
            }, {
                type: 'bar',
                data: [2, 4, 6, 8],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a'
            }, {
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a'
            }],
            
        };
        
        const id = 'J-bar-3';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
    
    
})