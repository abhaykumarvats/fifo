export type ItemType = {
  id: string;
  value: string;
};

export type QueueType = {
  id: string;
  name: string;
  items: ItemType[];
  counters: boolean;
};

export type QueuesType = QueueType[] | [];

export type CheckedCountersType = {
  [x: string]: number[];
};
