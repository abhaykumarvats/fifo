export type ItemType = {
  id: string
  value: string
}

export type QueueType = {
  id: string;
  name: string;
  items: ItemType;
};

export type QueuesType = QueueType[] | [];