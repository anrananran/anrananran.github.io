$(function(){
    
    /************和弦图**************/
    {
        let option = null;

        $.get('https://anrananran.github.io/week/mock/les-miserables.gexf', function (xml) {
            
            var graph = echarts.dataTool.gexf.parse(xml);
            var categories = [];
            for (var i = 0; i < 9; i++) {
                categories[i] = {
                    name: '类目' + i
                };
            }
            // console.log('xml:',graph);
            graph.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                    normal: {
                        show: node.symbolSize > 10
                    }
                };
                node.category = node.attributes.modularity_class;
            });
            console.log('节点数据：',graph.nodes);
            console.log('节点关系：',graph.links);
            option = {
                tooltip: {},
                // legend: [{
                //     // selectedMode: 'single',
                //     data: categories.map(function (a) {
                //         return a.name;
                //     }),
                //     textStyle: {
                //         color: '#fefefe',
                //     },
                //     itemGap: 20,
                // }],
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        name: '人物关系图',
                        type: 'graph',
                        layout: 'circular',
                        circular: {
                            rotateLabel: true
                        },
                        data: graph.nodes,
                        links: graph.links,
                        categories: categories,
                        roam: true,
                        label: {
                            normal: {
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0.3
                            }
                        }
                    }
                ]
            };

        }, 'xml');
        
        const id = 'J-graph-1';
        
        window[id] = function() {
            const chart = echarts.init(document.getElementById(id));
            chart.setOption(option);
        }
    }
})