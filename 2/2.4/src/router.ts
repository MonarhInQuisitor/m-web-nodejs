
import { getItems, createItem, editItem, deleteItem } from "./crud";
import {login,logout,register} from "./authorization"



const handler: Record<string, any> = {
    getItems: getItems,
    login: login,
    logout: logout,
    editItem: editItem,
    deleteItem: deleteItem,
    createItem: createItem,
    register: register
  }
  
export {handler}