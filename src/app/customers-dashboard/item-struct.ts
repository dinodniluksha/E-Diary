export class ItemStructure {
    itemType!: string;
    structureFields!: any;

    constructor(itemType: string, structureFields: any) {
        this.itemType = itemType;
        this.structureFields = structureFields;
    }
}