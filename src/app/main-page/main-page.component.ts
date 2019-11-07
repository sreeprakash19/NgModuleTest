import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  form: FormGroup = null;
  profileDetails: any[] = [
    {
      "user_uid": "",
      "user_email": "",
      "user_displayName": "",
      "user_phoneNo": "",
      "user_photoUrl": "",
      "user_customUrl": "",
      "house_address": "",
      "house_road": "",
      "house_city": "",
      "house_pin": "",
      "house_country": "",
      "Welcomemsg": ""
    }];

  familyDetails: any[] = [
    {
      "Father_FLink": "",
      "Father_FName": "",
      "Father_FBirth": "",
      "Father_FAnni": "",
      "Father_FLiving": "",
      "Father_MLink": "",
      "Father_MName": "",
      "Father_MBirth": "",
      "Father_MAnni": "",
      "Father_MLiving": "",
      "Mother_FLink": "",
      "Mother_FName": "",
      "Mother_FBirth": "",
      "Mother_FAnni": "",
      "Mother_FLiving": "",
      "Mother_MLink": "",
      "Mother_MName": "",
      "Mother_MBirth": "",
      "Mother_MAnni": "",
      "Mother_MLiving": "",
      "Father_name": "",
      "Father_Birth": "",
      "Father_Anni": "",
      "Father_Living": "",
      "Mother_name": "",
      "Mother_Birth": "",
      "Mother_Anni": "",
      "Mother_Living": ""
    }];

  KidsDetails: any[] = [
    {
      "Kid1_name": "",
      "Kid1_Birth": "",
      "Kid1_Anni": "",
      "Kid1_Living": ""
    },
    {
      "Kid2_name": "",
      "Kid2_Birth": "",
      "Kid2_Anni": "",
      "Kid2_Living": ""
    }];
  claimDetails: any[] = [
    {
      "uid": "",
      "photoUrl": "",
      "eventUid": "",
      "eventName": "",
      "giftAmount": ""
    }];
  invitesFollowup: any[] = [
    {
      "uid": "",
      "photoUrl": "",
      "message": "",
      "eventUid": "",
      "eventName": "",
      "giftAmount": "",
      "inviteResp": ""
    }];
  invitesData: any[] = [
    {
      "uid": "",
      "photoUrl": "",
      "message": "",
      "eventUid": "",
      "eventName": "",
      "eventTime": "",
      "eventDate": "",
      "eventLocation": "",
      "eventMap": ""
    }];

  constructor(public svc: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.svc.hellotext === '') {

      this.svc.sidebardisplay = `      
      
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'main-page') {

      this.svc.sidebardisplay = `      
      We can design the UI because we know the data to be loaded from database for the old user. For the new user after login we will save to the database with null values
      
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'ref-aray') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'ref-friends') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'claim-array') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'fn-array') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'link-req') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'claim-settings') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'search-settings') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'sc-write') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'sc-read') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'sc-writearray') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    if (this.svc.hellotext === 'sc-queryarray') {

      this.svc.sidebardisplay = `      
      Start
    `;
      this.svc.footerdisplay = `      
    `;
      this.svc.resultdisplay = `
    `;
      this.svc.moredisplay = `      
    `;
    }
    this.form = this.formBuilder.group({
    });

    const profileDetailsFG: FormGroup[] = this.profileDetails.map(v => {
      return this.formBuilder.group({
        user_uid: [v.user_uid],
        user_email: [v.user_email],
        user_displayName: [v.user_displayName],
        user_phoneNo: [v.user_phoneNo],
        user_photoUrl: [v.user_photoUrl],
        user_customUrl: [v.user_customUrl],
        house_address: [v.house_address],
        house_road: [v.house_road],
        house_city: [v.house_city],
        house_pin: [v.house_pin],
        house_country: [v.house_country],
        Welcomemsg: [v.Welcomemsg]
      });
    });
    const profileDetailsFGArray: FormArray = new FormArray(profileDetailsFG);
    (this.form as FormGroup).addControl('profileDetails', profileDetailsFGArray);

    const familyDetailsFG: FormGroup[] = this.familyDetails.map(v => {
      return this.formBuilder.group({
        Father_FLink: [v.Father_FLink],
        Father_FName: [v.Father_FName],
        Father_FBirth: [v.Father_FBirth],
        Father_FAnni: [v.Father_FAnni],
        Father_FLiving: [v.Father_FLiving],
        Father_MLink: [v.Father_MLink],
        Father_MName: [v.Father_MName],
        Father_MBirth: [v.Father_MBirth],
        Father_MAnni: [v.Father_MAnni],
        Father_MLiving: [v.Father_MLiving],
        Mother_FLink: [v.Mother_FLink],
        Mother_FName: [v.Mother_FName],
        Mother_FBirth: [v.Mother_FBirth],
        Mother_FAnni: [v.Mother_FAnni],
        Mother_FLiving: [v.Mother_FLiving],
        Mother_MLink: [v.Mother_MLink],
        Mother_MName: [v.Mother_MName],
        Mother_MBirth: [v.Mother_MBirth],
        Mother_MAnni: [v.Mother_MAnni],
        Mother_MLiving: [v.Mother_MLiving],
        Father_name: [v.Father_name],
        Father_Birth: [v.Father_Birth],
        Father_Anni: [v.Father_Anni],
        Father_Living: [v.Father_Living],
        Mother_name: [v.Mother_name],
        Mother_Birth: [v.Mother_Birth],
        Mother_Anni: [v.Mother_Anni],
        Mother_Living: [v.Mother_Living]
      });
    });
    const familyDetailsFGArray: FormArray = new FormArray(familyDetailsFG);
    (this.form as FormGroup).addControl('familyDetails', familyDetailsFGArray);

    const KidsDetailsFG: FormGroup[] = this.KidsDetails.map(v => {
      return this.formBuilder.group({
        Kid_name: [v.Kid_name],
        Kid_Birth: [v.Kid_Birth],
        Kid_Anni: [v.Kid_Anni],
        Kid_Living: [v.Kid_Living]
      });
    });
    const KidsDetailsFGArray: FormArray = new FormArray(KidsDetailsFG);
    (this.form as FormGroup).addControl('KidsDetails', KidsDetailsFGArray);

    const claimDetailsFG: FormGroup[] = this.claimDetails.map(v => {
      return this.formBuilder.group({
        uid: [v.uid],
        photoUrl: [v.photoUrl],
        eventUid: [v.eventUid],
        eventName: [v.eventName],
        giftAmount: [v.giftAmount]
      });
    });
    const claimDetailsFGArray: FormArray = new FormArray(claimDetailsFG);
    (this.form as FormGroup).addControl('claimDetails', KidsDetailsFGArray);

    const invitesFollowupFG: FormGroup[] = this.invitesFollowup.map(v => {
      return this.formBuilder.group({
        uid: [v.uid],
        photoUrl: [v.photoUrl],
        message: [v.message],
        eventUid: [v.eventUid],
        eventName: [v.eventName],
        giftAmount: [v.giftAmount],
        inviteResp: [v.inviteResp]
      });
    });
    const invitesFollowupFGArray: FormArray = new FormArray(invitesFollowupFG);
    (this.form as FormGroup).addControl('invitesFollowup', invitesFollowupFGArray);

    const invitesDataFG: FormGroup[] = this.invitesData.map(v => {
      return this.formBuilder.group({
        uid: [v.uid],
        photoUrl: [v.photoUrl],
        message: [v.message],
        eventUid: [v.eventUid],
        eventName: [v.eventName],
        eventTime: [v.eventTime],
        eventDate: [v.eventDate],
        eventLocation: [v.eventLocation],
        eventMap: [v.eventMap]
      });
    });
    const invitesDataFGArray: FormArray = new FormArray(invitesDataFG);
    (this.form as FormGroup).addControl('invitesData', invitesDataFGArray);
  }

}
