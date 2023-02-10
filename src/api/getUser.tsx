import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Users, userInterface } from "../type/userType";
import axios from "./index";

export function UseGetUser(url: string) {
  const [listUser, setListUser] = useState<userInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Users>(url);
        setListUser(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  return [listUser];
}
