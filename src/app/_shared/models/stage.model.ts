export class Stage {
  id?: string;
  pos: number;
  label: string;
  color: string;

  constructor(pos: number, label) {
    this.id = '';
    this.pos = pos;
    this.label = label;
    this.color = '#2ed573';
  }
}
