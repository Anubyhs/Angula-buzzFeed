import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
    `
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }

    .image-wrapper {
      position: relative;
      display: inline-block;
      margin-bottom: 20px;
    }

    h3 {
      color: red;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    } 
    `
  ]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
