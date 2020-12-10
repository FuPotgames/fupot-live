import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-owner-questions',
  templateUrl: './owner-questions.page.html',
  styleUrls: ['./owner-questions.page.scss'],
})
export class OwnerQuestionsPage implements OnInit {

  private selectedSegment: string = 'openEnded'
  
  showMe: boolean;
  
  constructor( private navController: NavController) { }

  ngOnInit() {
  }

  ownerBack() {
    this.navController.navigateRoot('/owner-creategame');
  }

    segmentChanged(event:any){
      console.log(event.target.value);
      this.selectedSegment=event.target.value

    }

    show() {
      this.showMe = !this.showMe;
    }

  
    

  
  
}


