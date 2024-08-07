import { AuthResponse } from "./actions";

export const BASE_URL = process.env.BACKEND_BASE_URL;
export const ROUTE_SECRET = process.env.ROUTE_SECRET;

const BASE_NAVIGATION = "/app";

export const COOOKIE_EXPIRY = 100000000000000;

const SESSION_EXPIRY = 10000;

export type Session = AuthResponse & { SESSION_EXPIRY: number };

export type PagedResponse<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};


export enum NAVIGATION {
  /*************************** Admin Routes ********************************************/
  ADMIN = "/admin",
  ADMIN_MANAGEMENT = `${ADMIN}/management`,
  ADMIN_BSMGT = `${ADMIN}/bsmgt`,
  ADMIN_CPMGT = `${ADMIN}/cpmgt`,
  ADMIN_STMGT = `${ADMIN}/stmgt`,
  ADMIN_RTMGT = `${ADMIN}/rtmgt`,
  ADMIN_USMGT = `${ADMIN}/usmgt`,
  ADMIN_REPORT = `${ADMIN}/report`,

  ADMIN_CHALLENGE = `${ADMIN}/challenges`,

  /*************************** User Routes ********************************************/
  USER = "/user",
  USER_BOOK = `${USER}/book`,
  USER_CHECKOUT = `${USER}/checkout`,

  /*************************** Captain Routes ********************************************/
  CAPTAIN = "/captain",
  CAPTAIN_CHECKOUT = "/captain/checkout",

  /*************************** Login Routes ********************************************/
  LOGIN = "/login",
}

export const viewport = "width=device-width, initial-scale=1, user-scalabe=no";


export type ErrorResponse = {
  apiPath: string,
  errorCode: string
  errorMessage: string
  errorTime: Date
}

export type FetchBusParams = {
  page?: number;
  size?: number;
  query?: string;
  sortDirection?: string;
  operationalStatus?: BUS_OPERATIONAL_STATUS;
};

export type BookBusParams = {
  accountId: number;
  busId: number;
};

export enum BOOKING_PERIOD {
  MORNING = "MORNING",
  EVENING = "EVENING"
}

export type BookBusResponse = {
  id: number,
  account: Account
  bus: Bus
  bookingTime: Date
  bookingPeriod: BOOKING_PERIOD
  bookingType: BOOKING_TYPE
  bookingNumber: number
  verified: boolean
}

export enum BOOKING_TYPE {
  WAITLIST = 'WAITLIST',
  RESERVED = 'RESERVED'
}

export type BusStats = {
  totalBuses: number,
  activeBuses: number,
  inactiveBuses: number,
}

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
  CAPTAIN = "CAPTAIN",
  DRIVER = "DRIVER",
  EBS = 'EBS',
  SUPER_USER = "SUPER_USER"
}

export type BaseEntity = {
  createdAt: Date | null;
  createdBy: number | null;
  updatedAt: Date | null;
  updatedBy: number | null;
};

export enum BUS_OPERATIONAL_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum USER_AUTHORITES {
  USER = "USER",
  ADMIN = "ADMIN",
  CAPTAIN = "CAPTAIN",
  EBS = "EBS"
}

export type User = {
  authorities: string;
  level: string;
  firstName: string;
  lastName: string;
  username: string;
};

export enum ACCOUNT_STATUS {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export type Account = {
  id: number;
  email: string;
  role: string;
  createdAt: Date;
  level: string;
  telephone: string;
  firstName: string;
  lastName: string;
  username: string;
  verificationStatus: ACCOUNT_STATUS;
  route: string;
  department: string;
  affiliate: string;
  staff_id: string;
  specialNeeds: boolean
};

export type Bus = {
  busId: number;
  busNumber: string;
  operationalStatus: BUS_OPERATIONAL_STATUS;
  busModel: string;
  busCapacity: number;
  busColor: string;
  routeName: string;
  driverId: number;
  captain: Account;
  driverName: string,
  driverPhoneNumber: string
  busStops: BusStop[];
  accounts: Account[];
} & BaseEntity;

export type BusStop = {
  busStopId: string;
  busStopName: string;
} & BaseEntity;

export type Report = {
  fullname: string,
  email: string
  activity: string,
  department: string
  date: Date
}