import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PrimeNG } from 'primeng/config';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { Knob } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    DatePickerModule,
    FormsModule,
    RatingModule,
    Knob,
    SplitButtonModule,
    ToastModule,
    DrawerModule,
    AvatarModule,
    Dialog,
    InputTextModule,
    CanvasJSAngularChartsModule,
    CheckboxModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class AppComponent {
  #primeng = inject(PrimeNG);
  #messageService = inject(MessageService);
  #cd = inject(ChangeDetectorRef);
  date: Date | undefined;
  rangeDates: Date[] | undefined;
  value!: number;
  knobValue: number = 40;
  items: MenuItem[] = [];
  visible: boolean = false;
  isVisibleDialog: boolean = false;
  chartTheme = 'light1';
  checked: boolean = false;

  chartOptions = {
    title: {
      text: 'Angular Column Chart with Index Labels',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        color: '#8E24AA',
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 71 },
          { x: 60, y: 92, indexLabel: 'Highest\u2191' },
          { x: 70, y: 68 },
          { x: 80, y: 38, indexLabel: 'Lowest\u2193' },
          { x: 90, y: 54 },
          { x: 100, y: 60 },
        ],
      },
    ],
    theme: this.chartTheme, //"light1", "dark1", "dark2"
  };

  constructor() {
    this.#primeng.ripple.set(true);
    this.initItems();
  }

  initItems() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Data Updated',
            life: 3000,
          });
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.#messageService.add({
            severity: 'warn',
            summary: 'Delete',
            detail: 'Data Deleted',
            life: 3000,
          });
        },
      },
      {
        separator: true,
      },
      {
        label: 'Quit',
        icon: 'pi pi-power-off',
        command: () => {
          window.open('https://angular.io/', '_blank');
        },
      },
    ];
  }

  showDialog() {
    this.isVisibleDialog = true;
  }

  toggleDarkMode() {
    const element: any = document.querySelector('html');
    element.classList.toggle('my-app-dark');

    this.chartTheme = this.chartTheme === 'light1' ? 'dark1' : 'light1';
    this.chartOptions.theme = this.chartTheme;
    this.#cd.markForCheck();
  }
}
