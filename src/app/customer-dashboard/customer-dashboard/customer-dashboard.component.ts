import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(public svc: UserService) { 
    this.svc.footerdisplay = `
  Plan: To create an atomic Lazy loaded Feature Module with shared Module and Service Provider.
    This module can be developed in feature-start and completed in feature-final.
    Once developed user can select the module for Manual testing or automated testing.

  steps to create this project:
    Start with angular-cli
    ng new test
    cd .\test\
    ng build
    ng serve
    git remote add origin https://github.com/gmanojisaac/NgModuleTest.git
    git push --set-upstream origin master
  
  
  Steps: For Testing Lazy-Feature Module with shared Module
    Plan: Use commands to create a branch from master 
    Use cli to create Feature module-CustomerDashboard using angular-cli
    Use cli to create module-app-material.
    Use cli to create shared module-shared importing common module but exporting common/forms Module`;
  }
  
  ngOnInit() {
  }

}
