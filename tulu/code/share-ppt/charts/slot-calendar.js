$(function() {
    
    /*********日历图*********/
    {
        function getVirtulData(year) {
            year = year || '2017';
            var date = +echarts.number.parseDate(year + '-01-01');
            var end = +echarts.number.parseDate((+year + 1) + '-01-01');
            var dayTime = 3600 * 24 * 1000;
            var data = [];
            for (var time = date; time < end; time += dayTime) {
                data.push([
                    echarts.format.formatTime('yyyy-MM-dd', time),
                    Math.floor(Math.random() * 10000)
                ]);
            }
            return data;
        }
    
        var data = getVirtulData(2016);
        
        option = {
            title: {
                top: 30,
                text: '2016年某人每天的步数',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                top: '30',
                left: '100',
                data:['步数', '前十'],
                textStyle: {
                    color: '#fff'
                }
            },
            calendar: [{
                top: 100,
                left: 'center',
                range: ['2016-01-01', '2016-06-30'],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                dayLabel: {
                    color: '#fefefe',
                },
                yearLabel: {
                    formatter: '{start}  上半年',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal',
                    }
                },
                monthLabel: {
                    color: '#fefefe',
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }, {
                top: 340,
                left: 'center',
                range: ['2016-07-01', '2016-12-31'],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                dayLabel: {
                    color: '#fefefe',
                },
                monthLabel: {
                    color: '#fefefe',
                },
                yearLabel: {
                    formatter: '{start}  下半年',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }],
            series : [
                {
                    name: '步数',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: data,
                    calendarIndex: 0,
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: '前十',
                    type: 'effectScatter',
                    calendarIndex: 0,
                    coordinateSystem: 'calendar',
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 10),
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: '步数',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: data,
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: '前十',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 10),
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                
            ]
        };

    }
    
    const id = 'J-calendar-1';
    
    window[id] = function() {
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }
})