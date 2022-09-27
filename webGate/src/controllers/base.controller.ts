import { MetadataKeys } from "../utils/metadata.keys"

export default class BaseController {
	protected _staticDirPath: string
	protected _basePath: string

	constructor(staticFilePath: string, basePath: string) {
		this._staticDirPath = staticFilePath
		
		this._basePath = basePath
		// Reflect.getOwnMetadata(MetadataKeys.BASE_PATH, globalThis)
		// || ''
	}

	protected redirectPath(endpoint: string): string {
		return this._basePath + endpoint
	}

	protected staticFile(assetName: string): string {
		return this._staticDirPath + '/views/' + assetName
	}
}
