import { Component } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-neptune',
  templateUrl: './neptune.component.html',
  styleUrls: ['./neptune.component.css']
})
export class NeptuneComponent{
  //Poisson Variables
  public landa:number;
  public landa2:number;
  public mew:number;
  public mew2:number;

  //Queue variables (time and number of elements within the queue)
  public n:number;
  public t:number;
  public T1:number;

  //First six formulas variables
  public Po:number;
  public lq:number;
  public ls:number;
  public wq:number;
  public ws:number;
  public p:number;

  //The other five formulas
  public Pn:number;
  public PtT:number;
  public Pnn:number;
  public Pwqt:number;
  public Pwst:number;

  public Nep:boolean;
  public Gear:boolean;
  public Plutia:boolean;
  public Uzume:boolean;

  //Euler value and support variables
  public euler:number;
  public support:number;
  public support2:number;


    public cambiarLanda:number;
    public cambiarMew:number;


  //We create the chart and its id value variables
  LineChart = [];
  id:string;

  //The method to display PO value in the label
  first(){
    this.landa2 = this.landa;
    this.mew2 = this.mew;

    if(this.cambiarLanda == 1){
      this.landa2 = this.landa*60;
    }
    if(this.cambiarLanda == 2){
      this.landa2 = this.landa/60;
    }
    if(this.cambiarMew == 1){
      this.mew2 = this.mew*60;
    }
    if(this.cambiarMew == 2){
      this.mew2 = this.mew/60;
    }
    this.Nep = true;
    this.Gear = false;
    this.Plutia = true;
    this.Uzume = false;
    this.Po = this.GetPO(this.landa2, this.mew2);
    this.CreateCharts(1);
    this.second();
  }

  //The method to display LQ value in the label
  second(){
    this.lq = this.GetLQ(this.landa2, this.mew2);
    this.CreateCharts(2);
    this.third();
  }

  //The method to display LS value in the label
  third(){
    this.ls = this.GetLS(this.landa2, this.mew2);
    this.CreateCharts(3);
    this.fourth();
  }

  //The method to display WQ value in the label
  fourth(){
    this.wq = this.GetWQ(this.landa2, this.mew2);
    this.CreateCharts(4);
    this.cinco();
  }

  //The method to display WS value in the label
  cinco(){
    this.ws = this.GetWS(this.mew2);
    this.CreateCharts(5);
    this.six();
  }

  //The method to display P value in the label
  six(){
    this.p = this.GetP(this.landa2, this.mew2);
    this.CreateCharts(6);
  }

  //The method to display Pn value in the label
  P1(){
    this.Nep = false;
    this.Gear = true;
    this.Plutia = false;
    this.Uzume = true;
    this.landa2 = this.landa;
    this.mew2 = this.mew;
    if(this.cambiarLanda == 1){
      this.landa2 = this.landa*60;
    }
    if(this.cambiarLanda == 2){
      this.landa2 = this.landa/60;
    }
    if(this.cambiarMew == 1){
      this.mew2 = this.mew*60;
    }
    if(this.cambiarMew == 2){
      this.mew2 = this.mew/60;
    }
    this.Pn = this.GetPN(this.landa2, this.mew2, this.n);
    this.CreateCharts(7);
    this.P2();
  }

  //The method to display PtT value in the label
  P2(){
    this.PtT = this.GetPTt(this.mew2);
    this.CreateCharts(8);
    this.P3();
  }

  //The method to display Pnn value in the label
  P3(){
    this.Pnn=this.GetPNn(this.n);
    this.CreateCharts(9);
    this.P4();
  }

  //The method to display PWQT value in the label
  P4(){
    this.Pwqt=this.GetPWQT(this.mew2);
    this.CreateCharts(10);
    this.P5();
  }

  //The method to display PWST value in the label
  P5(){
    this.Pwst=this.GetPWST(this.mew2);
    this.CreateCharts(11);
  }

  //Queue Theory get functions to fill the values for the chart and to return the value in the labels
  GetPO(lambda:number, mew2:number) {
    return 1 - (lambda/mew2);
  }

  GetLQ(lambda:number, mew2:number) {
    return (lambda*lambda)/(mew2*(mew2-lambda));
  }

  GetLS(lambda:number, mew2:number) {
    return lambda/(mew2-lambda);
  }

  GetWQ(lambda:number, mew2:number) {
    return lambda/(mew2*(mew2-lambda));
  }

  GetWS(mew2:number) {
    return this.wq + (1/mew2);
  }

  GetP(lambda:number, mew2:number) {
    return lambda/mew2;
  }

  GetPN(lambda:number, mew2:number, n:number) {
    this.euler = 2.718281828459045235360;
    this.support = 1;
    this.support2 = this.n;
    for(this.support2; this.support2>0; this.support2-- ) {
        this.support = this.support*this.support2;
    }
    return (((lambda*this.T1)**n)/(this.support))*(this.euler**(-lambda*this.T1));
  }

  GetPTt(mew2:number) {
    return 1 - (this.euler**(-1*mew2*this.T1));
  }

  GetPNn(n:number) {
    this.support2 = this.landa2/this.mew2;
    return (1-(this.support2))*(this.support2**n);
  }

  GetPWQT(mew2:number) {
    return this.support2*(this.euler**(-mew2*(1-this.support2)*this.t));
  }

  GetPWST(mew2:number) {
    return (this.euler**(-mew2*(1-this.support2)*this.t))
  }

  CreateCharts(numberC:number) {
    //We create the array to keep the values of data and labels in the chart
    var labelValues = [];
    var dataValues = [];
    //Variables to keep the text to be displayed
    var titleChartText:string;
    var labelText:string;
    //We fill the data according to number of elements in the system
    if(numberC == 7 || numberC == 9) {
      for(var counter:number = 0; counter<11; counter++) {
          //First we fill the labels with the xAxis label content
          labelValues.push(counter);
          //Fill the dataValues with PN values
          if(numberC == 7 && this.n <= 10) {
            dataValues.push(this.GetPN(this.landa2, this.mew2, counter));
          }
          else if(numberC == 7 && this.n > 10) {
            dataValues.push(this.GetPN(this.landa2, this.mew2, this.n + counter));
          }
          //Fill the dataValues with PNn values
          if(numberC == 9 && this.n <= 10) {
            dataValues.push(this.GetPNn(counter));
          }
          else if(numberC == 9 && this.n > 10) {
            dataValues.push(this.GetPNn(this.n + counter));
          }
        }
    }
    //We fill the value according mew2 value (number of clients that finishes the service over time period)
    else {
      for(var counter:number = 1; counter<6; counter++) {
        //First we fill the labels with the xAxis label content
        if(this.mew2 <= 5) {
          labelValues.push(counter);
        }
        else {
          labelValues.push(this.mew2 + counter - 1);
        }
        //Fill the dataValues with PO values
        if(numberC == 1 && this.mew2 <= 5) {
          dataValues.push(this.GetPO(this.landa2, counter));
        }
        else if(numberC == 1 && this.mew2 > 5) {
          dataValues.push(this.GetPO(this.landa2, counter - 1 + this.mew2));
        }
        //Fill the dataValues with LQ values
        if(numberC == 2 && this.mew2 <= 5) {
          dataValues.push(this.GetLQ(this.landa2, counter));
        }
        else if(numberC == 2 && this.mew2 > 5) {
          dataValues.push(this.GetLQ(this.landa2, counter - 1 + this.mew2));
        }
        //Fill the dataValues with LS values
        if(numberC == 3 && this.mew2 <= 5) {
          dataValues.push(this.GetLS(this.landa2, counter));
        }
        else if(numberC == 3 && this.mew2 > 5) {
          dataValues.push(this.GetLS(this.landa2, counter - 1 + this.mew2));
        }
        //Fill the dataValues with WQ values
        if(numberC == 4 && this.mew2 <= 5) {
          dataValues.push(this.GetWQ(this.landa2, counter));
        }
        else if(numberC == 4 && this.mew2 > 5) {
          dataValues.push(this.GetWQ(this.landa2, counter - 1 + this.mew2));
        }
        //Fill the dataValues with WS values
        if(numberC == 5 && this.mew2 <= 5) {
          //We first need to rerfresh wq value to get the expected ws value
          this.wq = this.GetWQ(this.landa2, counter);
          dataValues.push(this.GetWS(counter));
        }
        else if(numberC == 5 && this.mew2 > 5) {
          //We first need to rerfresh wq value to get the expected ws value
          this.wq = this.GetWQ(this.landa2, counter - 1 + this.mew2);
          dataValues.push(this.GetWS(counter - 1 + this.mew2));
        }
        //Fill the dataValues with P values
        if(numberC == 6 && this.mew2 <= 5) {
          dataValues.push(this.GetP(this.landa2, counter));
        }
        else if(numberC == 6 && this.mew2 > 5) {
          dataValues.push(this.GetP(this.landa2, counter - 1 + this.mew2));
        }
        //Fill the dataValues with PTt values
        if(numberC == 8 && this.mew2 <= 5) {
          dataValues.push(this.GetPTt(counter));
        }
        else if(numberC == 8 && this.mew2 > 5) {
          dataValues.push(this.GetPTt(counter - 1 + this.mew2));
        }
        //Fill the dataValues with PWQT values
        if(numberC == 10 && this.mew2 <= 5) {
          dataValues.push(this.GetPWQT(counter));
        }
        else if(numberC == 10 && this.mew2 > 5) {
          dataValues.push(this.GetPWQT(counter - 1 + this.mew2));
        }
        //Fill the dataValues with PWST values
        if(numberC == 11 && this.mew2 <= 5) {
          dataValues.push(this.GetPWST(counter));
        }
        else if(numberC == 11 && this.mew2 > 5) {
          dataValues.push(this.GetPWST(counter - 1 + this.mew2));
        }
      }
    }
    //Define which chart will be displayed and which data
    switch(numberC) {
      case 1: {
        this.id = 'lineChart';
        titleChartText = "PO";
        labelText = "Probabilidades de no esperar o estar vacio el sistema";
        break;
      }
      case 2: {
        this.id = 'lineChart2';
        titleChartText = "LQ";
        labelText = "Cantidad promedio de unidades en fila de espera";
        break;
      }
      case 3: {
        this.id = 'lineChart3';
        titleChartText = "LS";
        labelText = "Cantidad promedio de unidades en el sistema";
        break;
      }
      case 4: {
        this.id = 'lineChart4';
        titleChartText = "WQ";
        labelText = "Tiempo promedio en la linea de espera de una unidad";
        break;
      }
      case 5: {
        this.id = 'lineChart5';
        titleChartText = "WS";
        labelText = "Tiempo promedio de una unidad en el sistema";
        break;
      }
      case 6: {
        this.id = 'lineChart6';
        titleChartText = "P";
        labelText = "Probabilidad de que una unidad que llega tenga que esperar el servicio";
        break;
      }
      case 7: {
        this.id = 'lineChart7';
        titleChartText = "PN";
        labelText = "Probabilidad de que esten n unidades llegen en T intervalos de tiempo";
        break;
      }
      case 8: {
        this.id = 'lineChart8';
        titleChartText = "PtT";
        labelText = "Probabilidad de que el tiempo de servicio del cliente no sea mayor a T tiempos";
        break;
      }
      case 9: {
        this.id = 'lineChart9';
        titleChartText = "PNN";
        labelText = "Probabilidad de que hayan n unidades en el sistema";
        break;
      }
      case 10: {
        this.id = 'lineChart10';
        titleChartText = "PWQT";
        labelText = "Probabilidad de que cliente que llega tenga que esperar un tiempo mayor a t en la linea de espera";
        break;
      }
      case 11: {
        this.id = 'lineChart11';
        titleChartText = "PWST";
        labelText = "Probabilidad de que cliente que llega tenga que esperar un tiempo mayor a t en el sistema";
        break;
      }
    }
    //The chart that will be called in the canvas label by the id in the html selector
    this.LineChart = new Chart(this.id, {
        type: 'line',
        data: {
          labels: labelValues,
          datasets: [{
            label: labelText,
            data: dataValues,
            fill:false,
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text:titleChartText,
            display:true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
  }
}
