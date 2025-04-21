import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  showSuccess(message: string, title: string = 'הצלחה') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'אישור',
    });
  }

  showError(message: string, title: string = 'שגיאה') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'סגור',
    });}
    confirmDelete(message: string , title: string = 'אישור מחיקה'): Promise<boolean> {
      return Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'כן, מחק',
        cancelButtonText: 'ביטול',
        reverseButtons: true
      }).then(result => result.isConfirmed);
    }
    
}
