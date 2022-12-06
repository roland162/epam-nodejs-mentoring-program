export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

type Permissions = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export type Group = {
  id: string;
  name: string;
  permissions: Permissions[];
  userIds: string[];
};
