export interface Person {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
  price: number;
  assignedPeople: number[];
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}
