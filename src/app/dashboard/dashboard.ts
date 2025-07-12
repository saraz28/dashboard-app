import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { MatSidenav } from '@angular/material/sidenav';
import { DashboardService } from './services/dashboard-service';
import { Metric } from './model/statistic';
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
  @Input() searchTerm: string = '';

  // toggle side bar
  isExpanded: boolean = false;
  isShowing = false;

  // for chart data
  statsticsData: Metric[] = [];
  data: any;
  options: any;

  constructor(
    private dashboardService: DashboardService,
    private loadingService: LoaderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getStatsticsData();
  }

  getStatsticsData() {
    this.loadingService.setLoading(true);
    this.dashboardService.getStatstics().subscribe((data) => {
      this.statsticsData = data.metrics;
      this.loadingService.setLoading(false);
      const salesMetric = data.metrics.find(
        (m: any) => m.label === 'Total Sales'
      );

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
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );

    this.options = {
      responsive: true,
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
  }

  get searchedStatstics() {
    return this.statsticsData.filter((p) =>
      p.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
