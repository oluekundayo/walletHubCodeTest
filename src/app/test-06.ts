/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page
 */
 import { Component, NgModule } from '@angular/core';
 import { RouterModule } from '@angular/router';
 import { CommonModule } from '@angular/common';
 import { DomSanitizer } from '@angular/platform-browser';
 import { FormsModule } from '@angular/forms';
 
 @Component({
   selector: 'ng-app',
   template: `
     <h2>User Review:</h2>
     <textarea
       class="textfield"
       placeholder="Write your Review"
       [(ngModel)]="review_input"
       (ngModelChange)="onInputChange($event)"
     ></textarea>
     <br /><br />
     <h3>Output:</h3>
     <div class="output" [innerHTML]="review_content"></div>
   `,
   styles: [
     `
       .textfield {
         width: 600px;
         height: 220px;
         padding: 10px;
         box-sizing: border-box;
       }
     `,
     `
       .output {
         max-width: 100%;
         width: 600px;
         border: solid 1px #f9f6f6;
         padding: 5px;
         background: #ecebeb;
       }
     `,
   ],
 })
 export class ReviewComponent {
   // sample input
   review_input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 
 Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
           1) Nulla et tempus orci
           2) Integer semper porttitor faucibus
           
 At https://wallethub.com <b>bolded text</b>`;
 
   review_content: any;
   constructor(private sanitizer: DomSanitizer) {}
 
   ngOnInit() {
     this.renderReview(this.review_input);
   }
 
   onInputChange(value: string) {
     this.renderReview(value);
   }
 
   linkify(plainText): string {
     let replacedText;
     let replacePattern1;
     let replacePattern2;
     let replacePattern3;
 
     //URLs starting with http://, https://, or ftp://
     replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
     replacedText = plainText.replace(
       replacePattern1,
       '<a href="$1" target="_blank">$1</a>'
     );
 
     //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
     replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
     replacedText = replacedText.replace(
       replacePattern2,
       '$1<a href="http://$2" target="_blank">$2</a>'
     );
 
     //Change email addresses to mailto:: links.
     replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
     replacedText = replacedText.replace(
       replacePattern3,
       '<a href="mailto:$1">$1</a>'
     );
 
     return replacedText;
   }
 
   renderReview(value: string) {
     let data = this.sanitizer.bypassSecurityTrustHtml(value);
     this.review_content = data;
   }
 }
 
 @NgModule({
   imports: [
     CommonModule,
     RouterModule.forChild([
       {
         path: '',
         component: ReviewComponent,
       },
     ]),
     FormsModule,
   ],
   declarations: [ReviewComponent],
 })
 export class ReviewModule {}