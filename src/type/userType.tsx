export interface userInterface {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
  };
  email: string;
  dob: {
    date: string;
  };
  id: {
    name: string;
    value: string;
  };
  picture: {
    thumbnail: string;
  };
}
export interface Users {
  results:any[];
}

