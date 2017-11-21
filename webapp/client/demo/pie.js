'use strict';

$(document).ready(function(){
    // Make some sample data
    var pieData = [
        {data: 1, color: '#edeff0', label: 'Toyota'},
        {data: 2, color: '#c6cbcd', label: 'Nissan'},
        {data: 3, color: '#9fa6aa', label: 'Hyundai'},
        {data: 4, color: '#798288', label: 'Scion'},
        {data: 4, color: '#525d65', label: 'Daihatsu'}
    ]
    
    // Pie Chart
    if($('#chart-pie')[0]){
        $.plot('#chart-pie', pieData, {
            series: {
                pie: {
                    show: true,
                    stroke: { 
                        width: 0
                    }
                }
            },
            legend: {
                container: '.flot-chart-legend--pie',
                noColumns: 5
            }
        });
    }
    
    // Donut Chart
    if($('#chart-donut')[0]){
        $.plot('#chart-donut', pieData, {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    stroke: { 
                        width: 0,
                        color: '#2b3942'
                    }
                }
            },
            legend: {
                container: '.flot-chart-legend--donut',
                noColumns: 5
            }
        });
    }
});