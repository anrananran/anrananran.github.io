$(function(){
    const option = {
        color: COLORS,
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K'],
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
            },
            splitLine: {
                lineStyle: {
                    color: ['#666'],
                    opacity: .8,
                },
            },
        },
        series: [{
            data: [17227223, 28722400, 2943150, 1282380, 9287270, 11746110, 24653130, 7310089, 1548270, 60021195, 16771523],
            type: 'bar',
        }]
    };
    
    const id = 'J-max-num';
    window[id] = function() {
        const chart = echarts.init(document.getElementById(id));
        chart.setOption(option);
    }
})