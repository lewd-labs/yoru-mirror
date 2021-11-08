import { Collection } from "discord.js";

import SuccubusModuleError from "./error";

export default class Provider {
	public items: any;
	public model: any;
	constructor() {
		/**
		 * Cached entries.
		 * @type {Collection<string, Object>}
		 */
		this.items = new Collection();
	}

	/**
	 * Initializes the provider.
	 * @abstract
	 * @returns {any}
	 */
	init() {
		throw new SuccubusModuleError(
			"NOT_IMPLEMENTED",
			this.constructor.name,
			"init"
		);
	}
	/**
	 * Gets a value.
	 * @abstract
	 * @param {string} id - ID of entry.
	 * @param {string} key - The key to get.
	 * @param {any} [defaultValue] - Default value if not found or null.
	 * @returns {any}
	 */
	get(id: string, key: string, defaultValue: any): any {
		id;
		key;
		defaultValue;
		throw new SuccubusModuleError(
			"NOT_IMPLEMENTED",
			this.constructor.name,
			"get"
		);
	}

	/**
	 * Sets a value.
	 * @abstract
	 * @param {string} id - ID of entry.
	 * @param {string} key - The key to set.
	 * @param {any} value - The value.
	 * @returns {any}
	 */
	set(id: string, key: string, value: any): Promise<any> {
		id;
		key;
		value;
		throw new SuccubusModuleError(
			"NOT_IMPLEMENTED",
			this.constructor.name,
			"set"
		);
	}

	/**
	 * Deletes a value.
	 * @abstract
	 * @param {string} id - ID of entry.
	 * @param {string} key - The key to delete.
	 * @returns {any}
	 */
	delete(id: string, key: string): Promise<any> {
		id;
		key;
		throw new SuccubusModuleError(
			"NOT_IMPLEMENTED",
			this.constructor.name,
			"delete"
		);
	}

	/**
	 * Clears an entry.
	 * @abstract
	 * @param {string} id - ID of entry.
	 * @returns {any}
	 */
	clear(id: string): Promise<any> {
		id;
		throw new SuccubusModuleError(
			"NOT_IMPLEMENTED",
			this.constructor.name,
			"clear"
		);
	}
}
