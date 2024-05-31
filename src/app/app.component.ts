// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { HeaderComponent } from './header/header.component';

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterModule, HeaderComponent], 
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })


// export class AppComponent {
//   title = 'ng17-crud-app';
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, RouterModule, HeaderComponent],
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent {
title = 'ng17-crud-app';
}
