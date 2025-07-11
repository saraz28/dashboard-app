export interface Metric {
  label: string;
  total: number;
  percentage: number;
  totalByYesterday:number;
}
export interface Statstics {
  metrics: Metric[]; 
}