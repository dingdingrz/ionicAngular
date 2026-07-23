import { Routes } from '@angular/router';
import { Test } from './test/test';
import { Part } from './part/part';
import {CusForm} from './cus-form/cus-form';

export const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'test', component: Test },
  { path: 'part', component: Part },
  { path: 'cus-form', component: CusForm },
];
