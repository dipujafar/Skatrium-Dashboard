export type TInstrumentsData = {
  name: string;
  image: string;
};

export type TProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  sales: number;
  imageUrl: string;
};

export type TActivityItem = {
  id: string;
  type: "order" | "shipped" | "product" | "favorited" | "rated" | "discount" | "inquiry";
  activity: string;
  order_id?: string;
  product?: string;
  time_ago: string;
  details: string;
  color: string;
  icon: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: TMeta;
};
export type TUserRole = "ADMIN" | "USER";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  isDelete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  loginCount: number;
  about: null | string;
  dealCount: number;
  salesCount: number;
  monthlyTarget: number;
  dealClosedCount: number;
  league: null | any;
  commission: number;
  monthlyTargetPercentage: number;
  avgDealAmount: number;
  rank: number;
  fcmToken?: string;
  _count: {
    notifications: number;
  };
};

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  about: string;
  registeredId: string;
}

export type TSettings = {
  id: string;
  privacy: string;
  terms: string;
  about: string;
};

export type TNotification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  data: any;
  link: null | string;
  isRead: false;
  createdAt: string;
  updatedAt: string;
};


type Coordinates = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

type Image = {
  id: string;
  url: string;
  _id?: string;
};

type Category = {
  _id: string;
  name: string;
  id: string;
};

type Host = {
  _id: string;
  fullName: string;
  image: Image;
};

export type Event = {
  _id: string;
  title: string;
  category: Category;
  date: string; 
  host: Host;
  location: Coordinates;
  coverImage: Image;
};




