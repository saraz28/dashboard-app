import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { MatSidenav } from '@angular/material/sidenav';
import { DashboardService } from './services/dashboard-service';
import { Metric, Statstics } from './model/statistic';
import { App } from '../app';
import { LoaderService } from '../shared/loader/loader-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded: boolean = false;
  isShowing = false;
  activeTab: string = 'home';

  isDown!: boolean;

  statsticsData: Metric[] = []; // for raw data
  data: any; // for chart data
  options: any;
  // private app = inject(App);
  private loadingService = inject(LoaderService);

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.loadingService.setLoading(true);
    this.dashboardService.getStatstics().subscribe((data) => {
      this.statsticsData = data.metrics;
      this.loadingService.setLoading(false);

      console.log('data', data.metrics);
      const salesMetric = data.metrics.find(
        (m: any) => m.label === 'Total Sales'
      );

      const labels = ['Yesterday', 'Today'];
      if (salesMetric) {
        this.data = {
          labels: ['Today', 'Yesterday'],
          datasets: [
            {
              label: 'Total Sales',
              data: [salesMetric.total, salesMetric.totalByYesterday],
              borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
              yAxisID: 'y',
              backgroundColor: 'rgba(66,165,245,0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        };
      }

      // this.data = {
      //   labels,
      //   datasets: this.statsticsData.map((metric, index) => ({
      //     label: metric.label,
      //     data: [metric.totalByYesterday, metric.total],
      //     borderColor: this.getColor(index),
      //     tension: 0.4,
      //     fill: false,
      //   })),
      // };
      console.log('Chart data:', this.data);
    });
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );
    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
    this.cd.markForCheck();

    // this.options = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
    //     title: {
    //       display: true,
    //       text: 'Today vs Yesterday Metrics',
    //     },
    //   },
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // };
  }

  getColor(index: number): string {
    const colors = ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'];
    return colors[index % colors.length];
  }

  toggleSidebar() {
    // console.log('this.isExpanded', this.isExpanded);
    this.isExpanded = !this.isExpanded;
    console.log('this.isExpanded', this.isExpanded);
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
