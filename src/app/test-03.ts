/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" value="" name="email" (input)="inputEmail($event)" />
                    <br/>
                    <input type="password" value="" name="password" (input)="inputPassword($event)" />
                    <button type="button" [disabled]="!correctEmail || !correctPassword" (click)="onSubmit()">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string;
    password:string;

    correctEmail: string;
    correctPassword: string;

    logged_in = false;

    inputEmail(event){
        console.log(event.target.value)
        this.email = event.target.value;
        if(!this.validateEmail(this.email)) {
            this.correctEmail = '';
            this.logged_in = false;
            // console.log('Error')
        }else {
            this.correctEmail = this.email;
            // console.log('Correct')
        }
    }
    inputPassword(event){
        console.log(event.target.value)
        this.password = event.target.value;
        if(!this.validatePassword(this.password)) {
            this.correctPassword = '';
            this.logged_in = false;
            // console.log('Error')
        }else {
            this.correctPassword = this.password;
            // console.log('Correct')
        }
    }

    onSubmit() {
        if (this.correctEmail && this.correctPassword) {
            this.logged_in = true
        }
    }

    validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      validatePassword(password) {
        return password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&amp;])[A-Za-z\d@$!%*?&amp;]{8,}$/
        );
      };
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};

