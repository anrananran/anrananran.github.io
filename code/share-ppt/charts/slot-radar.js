$(function(){
    /*************** 雷达图 **************/
    {
        
        const option = {
            color: COLORS,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'center',
                data:['恶魔猎手','痛苦术士','暗影牧师'],
                itemGap: 30,
                textStyle: {
                    color: '#fefefe',
                },
            },
            radar: [
                {
                    indicator: [
                        {text: '群攻', max: 100},
                        {text: '伤害', max: 100},
                        {text: '机动性', max: 100},
                        {text: '防御', max: 100},
                        {text: '治疗', max: 100},
                        {text: '控制', max: 100},
                    ],
                    center: ['25%','40%'],
                    radius: 80,
                    name: {
                        color: COLORS[0],
                        fontSize: 14,
                    },
                },
                {
                    indicator: [
                        {text: '群攻', max: 100},
                        {text: '伤害', max: 100},
                        {text: '机动性', max: 100},
                        {text: '防御', max: 100},
                        {text: '治疗', max: 100},
                        {text: '控制', max: 100},
                    ],
                    radius: 80,
                    center: ['50%','75%'],
                    name: {
                        color: COLORS[1],
                        fontSize: 14,
                    },
                },
                {
                    indicator: [
                        {text: '群攻', max: 100},
                        {text: '伤害', max: 100},
                        {text: '机动性', max: 100},
                        {text: '防御', max: 100},
                        {text: '治疗', max: 100},
                        {text: '控制', max: 100},
                    ],
                    center: ['75%','40%'],
                    radius: 80,
                    name: {
                        color: COLORS[2],
                        fontSize: 14,
                    },
                }
            ],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                        {
                            value: [70,85,95,62,34,52],
                            name: '恶魔猎手'
                        },
                    ]
                },
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    radarIndex: 1,
                    data: [
                        {
                            value: [70, 95, 20, 58, 73,72],
                            name: '痛苦术士'
                        },
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 2,
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                        {
                            value: [84, 80, 45, 48, 85,76],
                            name: '暗影牧师'
                        },
                    ]
                }
            ]
        };

        const id = 'J-radar-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
})