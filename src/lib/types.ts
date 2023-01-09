export type ItemType = {
  id: string;
  value: string;
  count: number;
};

export type QueueType = {
  id: string;
  name: string;
  items: ItemType[];
  showCounter: boolean;
};

export type QueuesType = QueueType[] | [];

export type ValuesType = {
  [x: string]: number;
};

export type LabelsType = {
  [x: string]: { EN: string; HI: string };
};
