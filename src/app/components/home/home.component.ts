import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class homeComponent {

  inputVal:string = ""; 

  constructor(private testServ:TestService) {

  }

  onSendData() {
    this.testServ.sendData(this.inputVal);
  }

  getData() {
    this.testServ.getData(this.inputVal).subscribe((data)=>{
      console.log(data);
      
    });
  }
}
