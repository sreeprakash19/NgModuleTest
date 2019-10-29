import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Component({
  selector: 'app-feature-final',
  templateUrl: './feature-final.component.html',
  styleUrls: ['./feature-final.component.css']
})
export class FeatureFinalComponent implements OnInit {
  
  constructor(private svc: UserService, private afs: AngularFirestore) {
    this.svc.footerdisplay = '';
   }

  ngOnInit() {
  }

  addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    console.log(collectionKey, objectToAdd);
    const collectionRef = this.afs.collection(collectionKey);
    const batch = this.afs.firestore.batch();
    const newDocRef = collectionRef.doc().ref;
    objectToAdd.forEach(obj => {
      batch.set(newDocRef, obj);
    });
    return await batch.commit();
  }

}
/* Add an array inside the firestore also batch update and delete
array-contains/ array-union / array-remove - https://firebase.googleblog.com/2018/08/better-arrays-in-cloud-firestore.html
array-contains - https://angularfirebase.com/lessons/query-by-array-contains-firestore/
array-multiple reads - https://www.youtube.com/watch?v=35RlydUf6xo
Array - university - https://www.youtube.com/watch?v=Dx0_uGaMrzU
authguard- https://www.youtube.com/watch?v=KkNpEDU5RMA
How to push and update nested obj - https://stackoverflow.com/questions/46757614/how-to-update-an-array-of-objects-with-firestore
how to retrieve map - https://github.com/angular/angularfire/issues/708

first try this - https://stackoverflow.com/questions/46865124/return-nested-collection-from-firestore-as-object-for-angularfire2-and-firebase

  const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    console.log(collectionKey, objectToAdd);
    const collectionRef = this.afs.collection(collectionKey);
    const batch = this.afs.firestore.batch();
    const newDocRef = collectionRef.doc().ref;
    objectToAdd.forEach(obj => {
      batch.set(newDocRef, obj);
    });
    return await batch.commit();
};
*/