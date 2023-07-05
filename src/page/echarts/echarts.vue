<template>
    <div class="line1">
        <div id="line1" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
// import * as asterisk from '../../store/index'
// 测试import * 是否包含default
// 结论：在import中包含

import * as echarts from 'echarts'


export default {
    data() {
        return {
            sevenDay: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            dataArr: [
                [150, 232, 201, 154, 190, 330, 410],
                [320, 332, 301, 334, 390, 330, 320],
                [820, 932, 901, 934, 1290, 1330, 1320]
            ]
        }
    },
    mounted() {
        // console.log(asterisk);
        this.myChart = echarts.init(document.getElementById('line1'));
        this.initData();
    },
    methods: {
        initData() {
            const colors = ['#5793f3', '#675bba', '#d14a61'];
            const option = {
                color: colors,
                title: {
                    text: '走势图',
                    subtext: '副标题'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['新注册用户', '新增订单', '新增管理员']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['bar', 'line']},
                        restore: {},
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.sevenDay
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '用户',
                        min: 0,
                        max: 200,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '订单',
                        // min: 0,
                        // max: 200,
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                ],
                series: [
                    {
                        name:'新注册用户',
                        type:'line',
                        data:this.dataArr[0],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'新增订单',
                        type:'line',
                        data:this.dataArr[1],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'新增管理员',
                        type:'line',
                        data:this.dataArr[2],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    }
                ]
            };
            this.myChart.setOption(option);
        }
    }
}
</script>

<style>
.line1{
    display: flex;
    justify-content: center;
}
</style>