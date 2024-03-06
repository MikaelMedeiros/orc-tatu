import {  HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {

  }

  errorHandler(error: HttpErrorResponse){
    this.messageService.clear();
    error.error.errors.forEach((ex: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro.',
        detail: ex,
        life: 3500,
      });
    });
  }

  errorMsg(msg: string){
    this.messageService.clear();
   this.messageService.add({
     severity: 'error',
     detail: msg,
     life: 3500,
   });
 }


  successHandler(success: HttpResponse<any>){
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      detail: success.statusText ,
      life: 3500,
    });
  }


  successMsg(msg: string){
     this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      detail: msg,
      life: 3500,
    });
  }

}
