import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '@app/shared/functions/toBase64';

@Component({
  selector: 'app-input-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.scss',
})
export class InputImgComponent {
  @Input({ required: true })
  titulo: string = '';

  @Input({ required: false })
  urlImg?: string | null = '';

  @Output()
  imgFile: EventEmitter<File> = new EventEmitter();

  imgBase64?: string = '';

  cambio(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0] && target.files.length > 0) {
      const file: File = target.files[0];

      toBase64(file)
        .then((res) => (this.imgBase64 = res))
        .catch((err) => ((this.imgBase64 = ''), console.log(err)));

      this.imgFile.emit(file);

      this.urlImg = undefined;
    }
  }
}
