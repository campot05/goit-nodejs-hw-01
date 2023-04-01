const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("./node_modules/nanoid");

const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};
const getContactById = async (contactId) => {
  let allContacts = await listContacts();
  const contact = allContacts.find((e) => e.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  let allContacts = await listContacts();
  const newArr = allContacts.filter((e) => e.id !== contactId);
  updateContacts(newArr);
  return allContacts.filter((e) => e.id === contactId);
};
const addContact = async (data) => {
  let allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  const newArr = [...allContacts, newContact];
  updateContacts(newArr);
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
