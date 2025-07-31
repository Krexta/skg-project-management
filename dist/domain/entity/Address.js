export class Address {
    get projectAddressId() {
        return this._projectAddressId;
    }
    get projectId() {
        return this._projectId;
    }
    get projectPostalCode() {
        return this._projectPostalCode;
    }
    get projectProvince() {
        return this._projectProvince;
    }
    get projectAddress() {
        return this._projectAddress;
    }
    update(args) {
        return new UpdateAddress({
            projectAddressId: this.projectAddressId,
            projectId: this.projectId,
            projectPostalCode: args.projectPostalCode,
            projectProvince: args.projectProvince,
            projectAddress: args.projectAddress
        });
    }
    constructor(args){
        this._projectAddressId = args.projectAddressId;
        this._projectId = args.projectId;
        this._projectPostalCode = args.projectPostalCode;
        this._projectProvince = args.projectProvince;
        this._projectAddress = args.projectAddress;
    }
}
export class UpdateAddress {
    constructor(args){
        this.projectAddressId = args.projectAddressId;
        this.projectId = args.projectId;
        this.projectPostalCode = args.projectPostalCode;
        this.projectProvince = args.projectProvince;
        this.projectAddress = args.projectAddress;
    }
}

//# sourceMappingURL=Address.js.map