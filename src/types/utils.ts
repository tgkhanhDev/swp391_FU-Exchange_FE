export type PaginatedListDataType<T> = {
  meta: {
    total: number; // total amount
    count: number;  // current Render
    per_page: number; //I decide
    current_page: number; //I decide
    total_pages: number;  //Total Page
  };
  items: T[];
};

export type LoadMoreListDataType<T> = {
    meta: {
        total: number;
        count: number;
    }
    items: T[]
}
