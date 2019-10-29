import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';

import {map } from 'rxjs/operators';
import { of } from 'rxjs';

export class CollegeDept {
	deptHead = ''; 
  deptName = '';
  constructor(deptHead, deptName) { 
    this.deptHead = deptHead;
    this.deptName = deptName;
  }
}

export class College {
	CollegeName = '';
  PrincipalName = '';	
  constructor(CollegeName, PrincipalName) { 
    this.CollegeName = CollegeName;
    this.PrincipalName = PrincipalName;
  }
} 

export class CollegeEmp {
	empId = '';
	empName = ''; 
  skill = '';
}

export class Department {
	deptHead = ''; 
  deptName = '';
  constructor(deptHead, deptName) { 
    this.deptHead = deptHead;
    this.deptName = deptName;
  }
}

export class Team {
	teamName = '';
    teamManager = '';	
	teamDept : Department;
	employees: Employee[];
} 

export class Employee {
	empId = '';
	empName = ''; 
  skill = '';
  constructor(empId, empName, skill) { 
    this.empId = empId;
    this.empName = empName;
    this.skill = skill;
}
}


export const ALL_SKILLS = [
  {name: 'Java', displayName: 'Java'},
  {name: 'Angular', displayName: 'Angular'},
  {name: 'Dot Net', displayName: 'Dot Net'}
];

export const ALL_TEAMS: Team[] = [
  {
   "teamName":"Java Team",
   "teamManager":"Yogi",
   "teamDept":{
      "deptHead":"Modi",
      "deptName":"M Commerce"
    },
    "employees":[
       {
         "empId":"101",
         "empName":"Harish",
         "skill":"Java"
       },
       {
         "empId":"111",
         "empName":"Mohit",
         "skill":"Angular"
       }
      ]
   } 
 ];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public counter = 0;
  hellotext = '';
  hello = 0 ;
  footerdisplay = '';
  sidebardisplay = '';
  resultdisplay = '';
  moredisplay= '';
  public myData: BehaviorSubject<number> = new BehaviorSubject<number>(this.hello);

  increaseCounter() {
    this.counter++;
    this.hello = this.counter;
    this.myData.next(this.hello);
  }

  sendData( mytext){
    this.myData.next(mytext);
  }

  //team
  getSkills() {
    return of(ALL_SKILLS);		
}
getAllTeams(): Observable<Team[]> {
    return of(ALL_TEAMS);
}
getTeamByName(name: string): Observable<Team> {
         return this.getAllTeams().pipe(map(allTeams => allTeams.find(team => team.teamName === name)))     ;
  }
  saveTeam(team: Team) {
  console.log('------------TEAM------------');
  console.log('Team Name: '+ team.teamName);
  console.log('Team Manager: '+ team.teamManager);
  console.log('Dept Head: '+ team.teamDept.deptHead);
  console.log('Dept Name: '+ team.teamDept.deptName);
  console.log('----- Employee Detail -----');
  for(let emp of team.employees) {
    console.log('Emp Id: '+ emp.empId);
    console.log('Emp Name: '+ emp.empName);
    console.log('Emp Skill: '+ emp.skill);		
          console.log('-------------------');			
  }
}		


}
