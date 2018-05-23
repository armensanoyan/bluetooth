import { Component, ViewChild, Input, NgZone } from '@angular/core';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Events } from 'ionic-angular';

import { Chart } from 'chart.js';

@Component({
    selector: 'chart',
    templateUrl: 'chart.html'
})

export class ChartComponent {
    @Input() concentration
    @ViewChild('lineCanvas') lineCanvas;
    public value
    public show
    public RValue
    public hazar = 20000
 
    lineChart: any;
    XAxis = []
    XPoints = []
    constructor(
        public connectionProvider: ConnectionProvider,
        public events: Events,
        public ngZone: NgZone
    ) {}

    ngOnInit() {

        for(let i=0; i<600; i++) {
            this.XAxis.push(' ')
            this.XPoints.push(0)
        }

        this.events.subscribe('value', value => {
            this.react(value)
          });
    
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            
            type: 'line',
            data: {
                labels: this.XAxis,
                datasets: [
                    {
                        label: "gas concentration",
                        fill: 'origin',
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "rgba(75,192,192,1)",
                        pointBorderWidth: 1,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 3,
                        data: this.XPoints,
                        spanGaps: false,
                    }
                ],
                
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines:{
                            drawOnChartArea:false
                        },
                        ticks: {
                            max: 12,
                            min: 0.2,
                        }
                    }],
                    xAxes:[{
                        gridLines:{
                            display: false,
                            drawBorder:false,
                            drawOnChartArea:false
                        },
                    }]
                }
            }
        });
        console.log('this.lineChart   ', this.lineChart);
    }

    

    react(value='') {

        const gazVoltage = Number(value)/51
        const gazResistance = ( (800000 * (4.9 - gazVoltage) ) /gazVoltage ) / 100000

        if (gazResistance < 7) {
            this.lineChart.data.datasets[0].backgroundColor = "rgba(255,0,0,0.4)"
            this.lineChart.data.datasets[0].borderColor = "rgba(255,0,0)"
            this.lineChart.data.datasets[0].pointBorderColor = "rgba(255,0,0)"
            this.lineChart.options.scales.xAxes.gridLines = {
                display: false,
                drawBorder:false,
                drawOnChartArea:false
            }
        }
        else {
            this.lineChart.data.datasets[0].backgroundColor = "rgba(75,192,192,0.4)"
            this.lineChart.data.datasets[0].borderColor = "rgba(75,192,192,1)"
            this.lineChart.data.datasets[0].pointBorderColor = "rgba(75,192,192,1)"
        } 
        
        this.lineChart.data.datasets[0].data.splice(0,1)
        this.lineChart.data.datasets[0].data.push(gazResistance)

        this.ngZone.run(() => {
            this.RValue = Number(value)
            this.show = gazResistance
        })
        this.lineChart.update()
    }
}
