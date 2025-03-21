import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginado.component.html',
  styleUrl: './paginado.component.scss',
})
export class PaginadoComponent<T> {
  @Input() content: T[] = [];
  @Input() page: number = 0;
  @Input() size: number = 10;
  @Input() totalElements: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() maxVisiblePages: number = 0;
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Input() isFirstPage: boolean = false;
  @Input() isLastPage: boolean = false;
  @Input() showCantPages: boolean = true;

  @Output() firstPage = new EventEmitter<void>();
  @Output() lastPage = new EventEmitter<void>();
  @Output() rewind = new EventEmitter<void>();
  @Output() forward = new EventEmitter<void>();
  @Output() setPage = new EventEmitter<number>();

  constructor() {}

  First() {
    if (!this.isFirst) {
      this.firstPage.emit();
    }
  }

  Last() {
    if (!this.isLast) {
      this.lastPage.emit();
    }
  }

  Rewind() {
    if (this.currentPage > 1 && !this.isFirst) {
      //TODO: Ver porque anule el negado de isFirst
      this.rewind.emit();
    }
  }

  Forward() {
    if (this.currentPage < this.totalPages && !this.isLast) {
      this.forward.emit();
    }
  }

  SetPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.setPage.emit(pageNumber);
    }
  }

  getShowingResultsMessage(): string {
    /* const startIndex =
      this.page >= this.size ? this.page * this.size : this.totalElements; */

    const startIndex = this.page * this.size;
    const endIndex = Math.min(startIndex + this.size, this.totalElements);

    return `Mostrando registros del ${startIndex} al ${endIndex} de un total de ${this.totalElements} registros`;
  }

  get visiblePagesBefore(): number[] {
    const currentPageIndex = this.currentPage - 1;
    const totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

    const leftIndex = Math.max(0, currentPageIndex - this.maxVisiblePages);
    const visiblePages = totalPagesArray.slice(leftIndex, currentPageIndex);

    if (leftIndex > 0) {
      visiblePages.unshift(0);
    }

    return visiblePages;
  }

  get visiblePagesAfter(): number[] {
    const currentPageIndex = this.currentPage - 1;
    const totalPagesArray = Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

    const rightIndex = Math.min(
      this.totalPages,
      currentPageIndex + this.maxVisiblePages
    );
    const visiblePages = totalPagesArray.slice(currentPageIndex, rightIndex);

    if (rightIndex < this.totalPages) {
      visiblePages.push(0);
    }

    return visiblePages;
  }
}
