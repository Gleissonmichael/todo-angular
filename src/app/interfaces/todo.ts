export interface Todo {
  id: number;
  name: string;
  category: string;
  isCompleted: boolean;
}

export interface TodosResult {
  count: number;
  data: Todo[],
  success: boolean;
}

export interface TodoResult {
  count: number;
  data: Todo,
  success: boolean;
}
