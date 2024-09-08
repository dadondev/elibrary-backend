class catalogDto {
    id:string;
    firstName:string;
    lastName:string;
    address:string;
    phoneNumber:string;
    birthday:Date;
    parents:any[]
    constructor(data:any){
        this.id = data._id
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.birthday = data.birthday;
        this.parents = data.parents.map((e:any)=>new Parent(e))
    }
}

class Parent {
    id:string
    firstName:string;
    lastName:string;
    phoneNumber:string;
    role:string;
    job:string;
    constructor(data:any) {
        this.id = data._id
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.phoneNumber = data.phoneNumber;
        this.role = data.role
        this.job = data.job
    }
}



export default catalogDto