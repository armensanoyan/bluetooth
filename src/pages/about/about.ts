
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('alineCanvas') alineCanvas;
 
    lineChart: any;
    alineChart: any;
 
    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad() {
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        spanGaps: false,
                    }
                ]
            }
 
        });
 


    }

    react() {
        this.lineChart.data.datasets[0].data.splice(0,1)
        this.lineChart.data.datasets[0].data.push(Math.floor((Math.random() * 100) + 1))

        this.lineChart.update()

        console.log('react   ', this.lineChart.data.datasets[0].data);
        
    }
 
}

