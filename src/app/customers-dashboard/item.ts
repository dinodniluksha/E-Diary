export class Item {
    _id!: number;
    type!: string;
    attributes!: any;

    constructor(_id: number, type: string, attributes: any) {
        this._id = _id;
        this.type = type;
        this.attributes = attributes;
    }
}