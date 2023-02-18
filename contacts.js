const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
	(async () => {
		try {
			const data = await fs.readFile(contactsPath, 'utf8');
			const contacts = JSON.parse(data);
			console.log(contacts);
		} catch (error) {
			console.error(error);
		}
	})();
}

function getContactById(contactId) {
	(async () => {
		try {
			const data = await fs.readFile(contactsPath, 'utf8');
			const contacts = JSON.parse(data);
			const contact = contacts.find((elem) => elem.id === contactId);
			console.log(contact);
		} catch (error) {
			console.error(error);
		}
	})();
}

function removeContact(contactId) {
	(async () => {
		try {
			const data = await fs.readFile(contactsPath, 'utf8');
			const contacts = JSON.parse(data);
			const deletedContactIndex = contacts.findIndex(
				({ id }) => id === contactId
			);
			if (deletedContactIndex === -1) {
				throw Error('No such ID in contacts');
			}
			contacts.splice(deletedContactIndex, 1);
			const stringifyContacts = JSON.stringify(contacts);
			await fs.writeFile(contactsPath, stringifyContacts);
		} catch (error) {
			console.error(error);
		}
	})();
}

function addContact(name, email, phone) {
	(async () => {
		try {
			const data = await fs.readFile(contactsPath, 'utf8');
			const contacts = JSON.parse(data);
			let maxId = 0;
			contacts.forEach(({ id }) => {
				if (id > maxId) {
					maxId = id;
				}
			});
			maxId += 1;
			contacts.push({ id: maxId, name, email, phone });
			const stringifyContacts = JSON.stringify(contacts);
			await fs.writeFile(contactsPath, stringifyContacts);
		} catch (error) {
			console.error(error);
		}
	})();
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
