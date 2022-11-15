/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    <input type="text" placeholder="First Name" (change)="inputFirstName($event)">
                    <br>
                    <input type="text" placeholder="Last Name" (change)="inputLastName($event)">
                    <br><br>

                    {{username}}
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    username: string;
    fName: string;
    lName: string;


    constructor() {
        
    console.log()
    }

    inputFirstName(event){
        this.fName = event.target.value
        if (!this.fName) {
            this.username = ''
            return;
        }
        if (this.fName && this.lName == '') {
            this.username = ''
            return
        }else {
            this.submitUser()
        }

    }
    inputLastName(event){
        this.lName = event.target.value
        this.lName = event.target.value
        if (!this.lName) {
            this.username = ''
            return;
        }
        if (this.lName && this.fName == '') {
            this.username = ''
            return
        }else {
            this.submitUser()
        }
    }

    submitUser() {
        let random = Math.floor(Math.pow(10, 1-1) + Math.random() * 9 * Math.pow(10, 1-1))
        this.username = `${this.fName.toLowerCase()}_${this.lName.toLowerCase()}_${random}`
    }
    // random = Math.floor(Math.pow(10, 4-1)

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};