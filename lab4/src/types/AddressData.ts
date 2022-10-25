class AddressData {

    street: string;
    zipCode: string;
    city: string;

    constructor(street: string, zipCode: string, city: string) {
        this.street = street;
        this.zipCode = zipCode;
        this.city = city;
    }
}
export default AddressData;