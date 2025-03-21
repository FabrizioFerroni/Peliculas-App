import { Injectable } from '@angular/core';
import { ToastType, NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class NotificationUtils {
  constructor(private toast: NgToastService) {}

  toastMsg(
    type: ToastType,
    detail: string,
    summary: string,
    duration: number
  ): void {
    switch (type) {
      case ToastType.SUCCESS:
        this.toast.success(detail, summary, duration);
        break;
      case ToastType.DANGER:
        this.toast.danger(detail, summary, duration);
        break;
      case ToastType.INFO:
        this.toast.info(detail, summary, duration);
        break;
      case ToastType.WARNING:
        this.toast.warning(detail, summary, duration);
        break;
    }
  }
}
