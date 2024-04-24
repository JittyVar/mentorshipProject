import { Status } from "./Status";

export interface HomeTableColumns {
  id: string;
  avatar: string;
  fullName: string;
  registeredOn: string;
  status: Status;
  assignedMentor: string;
  participatingAs: string;
  action: string;
  pairedDuring: string;
}
