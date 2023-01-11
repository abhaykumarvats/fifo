// Dependencies
import type { LabelsType } from "./types";

// Constants
export const LANGUAGES = ["EN", "HI"];

export const LABELS: LabelsType = {
  NEW: { EN: "New", HI: "नई पंक्ति बनाएँ" },
  MY_QUEUES: { EN: "My Queues", HI: "मेरी पंक्तियाँ" },
  NO_QUEUES_FOUND: { EN: "No Queues Found", HI: "कोई पंक्ति नहीं है" },
  CREATE_NEW_QUEUE: { EN: "Create New Queue", HI: "नई पंक्ति बनाएँ" },
  ENTER_QUEUE_NAME: { EN: "Enter Queue Name", HI: "पंक्ति का नाम डालें" },
  ENTER_ITEM_NAME: { EN: "Enter Item Name", HI: "वस्तु का नाम डालें" },
  ADD: { EN: "Add", HI: "डालें" },
  ADD_COUNTER: { EN: "Add Counter", HI: "पंक्ति में गणित्र डालें" },
  SAVE: { EN: "Save", HI: "सेव करें" },
  REMOVE: { EN: "Remove", HI: "हटाएँ" },
  DELETE_ALL: { EN: "Delete All", HI: "सारी पंक्तियाँ हटाएँ" },
  SURE: { EN: "Sure?", HI: "पक्का?" },
  EDIT: { EN: "Edit", HI: "एडिट" },
  USE: { EN: "Use", HI: "उपयोग" },
  SEND_TO_LAST: { EN: "Send to Last", HI: "अंत में भेजें" },
  UNDO: { EN: "Undo", HI: "पूर्ववत करें" },
  UP_NEXT: { EN: "Up Next", HI: "अगला" },
  LAST_COUNT: { EN: "Last Count", HI: "पिछली संख्या" },
  EDIT_ITEM_NAME: {
    EN: "Edit Item Name (Max 5 Characters)",
    HI: "वास्तु का नाम एडिट करें (अधिकतम 5 अक्षर)",
  },
  EDIT_QUEUE: { EN: "Edit Queue", HI: "पंक्ति एडिट करें" },
  DELETE: { EN: "Delete", HI: "पंक्ति हटाएँ" },
  ITEM_LESS_THAN_5_ERROR: {
    EN: "Item Name Must Be Less Than 5 Characters",
    HI: "वस्तु का नाम 5 अक्षरों से कम का होना चाहिए",
  },
  ENTER_QUEUE_NAME_ERROR: {
    EN: "Please Enter Queue Name",
    HI: "कृपया पंक्ति का नाम डालें",
  },
  QUEUE_LESS_THAN_10_ERROR: {
    EN: "Queue Name Must Be Less Than 10 Characters",
    HI: "पंक्ति का नाम 10 अक्षरों से कम का होना चाहिए",
  },
  ITEM_ATLEAST_ONE_ERROR: {
    EN: "Please Add Atleast One Item",
    HI: "कृपया कम से कम एक वस्तु डालें",
  },
};
