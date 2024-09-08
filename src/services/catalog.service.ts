/** @format */

import catalogDto from "../dtos/catalog.dto";
import catalogSchema from "../models/catalog.schema";
import catalogValidator, {
	parentValidator,
} from "../validators/catalog.validator";

class catalogService {
	async getAll() {
		const datas = await catalogSchema.find();
		return datas.map((e) => new catalogDto(e));
	}
	async getOne(id: string) {
		const catalog = await catalogSchema.findById(id);
		return new catalogDto(catalog);
	}
	async create(data: any) {
		const validatedData = catalogValidator.validateSync(data);
		const newCatalog = await catalogSchema.create(validatedData);
		return new catalogDto(newCatalog);
	}
	async edit(id: string, data: any) {
		const editedCatalog = await catalogSchema.findByIdAndUpdate(id, data, {
			new: true,
		});
		return new catalogDto(editedCatalog);
	}
	async addParent(id: string, data: any) {
		const validatedData = parentValidator.validateSync(data);
		const existUser = await catalogSchema.findById(id);
		if (!existUser) throw new Error("Catalog is not found");
		existUser.parents.push(existUser.parents.create(validatedData));
		return new catalogDto(existUser);
	}
	async delete(id: string) {
		const catalog = await catalogSchema.findByIdAndDelete(id);
		return new catalogDto(catalog);
	}
}

export default new catalogService();
